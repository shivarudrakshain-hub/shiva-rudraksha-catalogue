<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Cart;
use App\Models\City;
use App\Models\CombinedOrder;
use App\Models\Country;
use App\Models\Currency;
use App\Models\Product;
use App\Models\State;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/**
 * Backend for the /forge 3D storefront (public/forge/index.html).
 * Keeps cart interactions inside the FORGE page (JSON) instead of the themed shop pages.
 */
class ForgeController extends Controller
{
    /** Cart rows for the current user or guest session. */
    private function userCarts(Request $r)
    {
        if (auth()->user()) {
            return Cart::where('user_id', auth()->id())->get();
        }
        $t = $r->session()->get('temp_user_id');
        return $t ? Cart::where('temp_user_id', $t)->get() : collect();
    }

    /** Turn a stored variant string ("DoubleChocolate-907G") into a readable label. */
    private function variationLabel($product, $variation)
    {
        if (!$variation) return '';
        $co = json_decode($product->choice_options, true) ?: [];
        $values = [];
        foreach ($co as $opt) {
            foreach (($opt['values'] ?? []) as $v) {
                $values[str_replace(' ', '', $v)] = $v;
            }
        }
        $parts = array_map(function ($p) use ($values) {
            return $values[$p] ?? $p;
        }, explode('-', $variation));
        return implode(' / ', $parts);
    }

    private function currencySymbol()
    {
        $cur = Currency::find(get_setting('system_default_currency'));
        return $cur ? $cur->symbol : '₹';
    }

    /** JSON snapshot of the cart for the drawer. */
    public function cartData(Request $r)
    {
        $carts = $this->userCarts($r);
        $items = [];
        $subtotal = 0;
        $count = 0;
        foreach ($carts as $c) {
            $p = Product::find($c->product_id);
            if (!$p) continue;
            $stock = $p->stocks->where('variant', $c->variation)->first();
            $unit = $stock ? (float) $stock->price : (float) $p->unit_price;
            $line = $unit * $c->quantity;
            $subtotal += $line;
            $count += $c->quantity;
            $items[] = [
                'id'        => $c->id,
                'name'      => $p->getTranslation('name'),
                'variation' => $this->variationLabel($p, $c->variation),
                'qty'       => (int) $c->quantity,
                'unit'      => $unit,
                'line'      => $line,
            ];
        }
        return response()->json([
            'items'    => $items,
            'subtotal' => $subtotal,
            'shipping' => 0,
            'total'    => $subtotal,
            'currency' => $this->currencySymbol(),
            'count'    => $count,
        ]);
    }

    /** Increment / decrement a cart row (guarded to the caller's own cart). */
    public function updateQty(Request $r)
    {
        $cart = $this->userCarts($r)->firstWhere('id', (int) $r->input('id'));
        if ($cart) {
            $delta = $r->input('action') === 'dec' ? -1 : 1;
            $cart->quantity = max(0, $cart->quantity + $delta);
            if ($cart->quantity <= 0) {
                $cart->delete();
            } else {
                $cart->save();
            }
        }
        return $this->cartData($r);
    }

    /** Remove a cart row. */
    public function removeItem(Request $r)
    {
        $cart = $this->userCarts($r)->firstWhere('id', (int) $r->input('id'));
        if ($cart) $cart->delete();
        return $this->cartData($r);
    }

    /**
     * Place a real order from inside the FORGE page (no themed pages).
     * Creates/uses a customer + address, then runs the engine's real order pipeline.
     * COD only for now; online (Razorpay) returns needs_gateway until keys are configured.
     */
    public function placeOrder(Request $r)
    {
        $v = Validator::make($r->all(), [
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city'    => 'required|string|max:120',
            'postal_code' => 'required|string|max:20',
            'payment' => 'required|in:cod,online',
        ]);
        if ($v->fails()) {
            return response()->json(['ok' => false, 'errors' => $v->errors()], 422);
        }

        $carts = $this->userCarts($r);
        if ($carts->isEmpty()) {
            return response()->json(['ok' => false, 'message' => 'Your cart is empty.'], 422);
        }

        if ($r->input('payment') === 'online') {
            // Razorpay keys not wired yet — surface a clear signal to the page.
            return response()->json(['ok' => false, 'needs_gateway' => true,
                'message' => 'Online payment is not configured yet. Add Razorpay keys, then online pay turns on.'], 200);
        }

        // ---- resolve geo (India; has_state is off so state is cosmetic) ----
        $country = Country::where('code', 'IN')->orWhere('name', 'India')->first();
        $countryId = $country ? $country->id : 297;
        $stateId = optional(State::where('country_id', $countryId)->first())->id;
        $cityName = trim($r->input('city'));
        $city = City::where('name', $cityName)->where('state_id', $stateId)->first();
        if (!$city) {
            $city = new City();            // City is fully guarded — assign by property
            $city->name = $cityName;
            $city->state_id = $stateId;
            $city->country_id = $countryId;
            $city->cost = 0;
            $city->status = 1;
            $city->save();
        }

        // ---- customer: logged-in user, else reuse by email, else create ----
        $user = auth()->user() ?: User::where('email', $r->input('email'))->first();
        if (!$user) {
            $user = new User();
            $user->name = $r->input('name');
            $user->email = $r->input('email');
            $user->phone = $r->input('phone');
            $user->password = Hash::make(substr(hash('sha512', (string) rand()), 0, 10));
            $user->email_verified_at = now();
            $user->save();
        }

        // ---- address ----
        $address = new Address();
        $address->user_id     = $user->id;
        $address->address     = $r->input('address');
        $address->country_id  = $countryId;
        $address->state_id    = $stateId;
        $address->city_id     = $city->id;
        $address->postal_code = $r->input('postal_code');
        $address->phone       = $r->input('phone');
        $address->set_billing = 1;
        $address->save();

        // ---- attach cart to the user + address, log in ----
        $temp = $r->session()->get('temp_user_id');
        if ($temp) {
            Cart::where('temp_user_id', $temp)->update(['user_id' => $user->id, 'temp_user_id' => null]);
        }
        Cart::where('user_id', $user->id)->update([
            'address_id' => $address->id,
            'billing_address' => $address->id,
        ]);
        auth()->login($user);
        $r->session()->forget('temp_user_id');

        // ---- run the engine's real order pipeline ----
        $orderReq = new Request();
        $orderReq->setLaravelSession($r->session());
        $orderReq->merge(['payment_option' => 'cash_on_delivery', 'additional_info' => $r->input('note', '')]);
        try {
            (new OrderController())->store($orderReq);
        } catch (\Throwable $e) {
            return response()->json(['ok' => false, 'message' => 'Could not place the order: ' . $e->getMessage()], 500);
        }

        $combinedId = $r->session()->get('combined_order_id');
        if (!$combinedId) {
            return response()->json(['ok' => false, 'message' => 'Order could not be created (stock/availability). Please try again.'], 500);
        }
        $combined = CombinedOrder::find($combinedId);
        $order = $combined ? $combined->orders->first() : null;

        // clear the cart now that the order exists
        Cart::where('user_id', $user->id)->delete();

        return response()->json([
            'ok'    => true,
            'code'  => $order ? $order->code : ('FORGE-' . $combinedId),
            'total' => $combined ? (float) $combined->grand_total : 0,
        ]);
    }

    // ---- FORGE account (own pages, engine web guard) ----

    private function userPayload($u)
    {
        return $u ? ['name' => $u->name, 'email' => $u->email, 'phone' => $u->phone] : null;
    }

    /** Attach a guest session cart to a user after login/register. */
    private function migrateGuestCart(Request $r, $user)
    {
        $temp = $r->session()->get('temp_user_id');
        if ($temp) {
            Cart::where('temp_user_id', $temp)->update(['user_id' => $user->id, 'temp_user_id' => null]);
            $r->session()->forget('temp_user_id');
        }
    }

    /** Current auth state for the nav / account panel. */
    public function me(Request $r)
    {
        $u = auth()->user();
        return response()->json([
            'auth'   => (bool) $u,
            'user'   => $this->userPayload($u),
            'orders' => $u ? Order::where('user_id', $u->id)->count() : 0,
        ]);
    }

    public function login(Request $r)
    {
        $v = Validator::make($r->all(), ['email' => 'required|email', 'password' => 'required|string']);
        if ($v->fails()) return response()->json(['ok' => false, 'message' => 'Enter email and password.'], 422);

        if (!Auth::attempt(['email' => $r->input('email'), 'password' => $r->input('password')], (bool) $r->input('remember'))) {
            return response()->json(['ok' => false, 'message' => 'Wrong email or password.'], 401);
        }
        $u = auth()->user();
        if (in_array($u->user_type, ['admin', 'staff', 'seller'])) {   // customers only on the storefront
            auth()->logout();
            return response()->json(['ok' => false, 'message' => 'Use a customer account.'], 403);
        }
        $r->session()->regenerate();
        $this->migrateGuestCart($r, $u);
        return response()->json(['ok' => true, 'user' => $this->userPayload($u), 'csrf' => csrf_token()]);
    }

    public function register(Request $r)
    {
        $v = Validator::make($r->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255|unique:users,email',
            'phone'    => 'required|string|max:20',
            'password' => 'required|string|min:6',
        ]);
        if ($v->fails()) {
            return response()->json(['ok' => false, 'message' => $v->errors()->first()], 422);
        }
        $u = new User();                         // User is guarded — assign by property
        $u->name = $r->input('name');
        $u->email = $r->input('email');
        $u->phone = $r->input('phone');
        $u->user_type = 'customer';
        $u->password = Hash::make($r->input('password'));
        $u->email_verified_at = now();
        $u->save();

        auth()->login($u);
        $this->migrateGuestCart($r, $u);
        return response()->json(['ok' => true, 'user' => $this->userPayload($u), 'csrf' => csrf_token()]);
    }

    public function logout(Request $r)
    {
        auth()->logout();
        $r->session()->regenerateToken();
        return response()->json(['ok' => true, 'csrf' => csrf_token()]);
    }

    /** The logged-in customer's orders for the account panel. */
    public function orders(Request $r)
    {
        $u = auth()->user();
        if (!$u) return response()->json(['auth' => false, 'orders' => []], 200);
        $sym = $this->currencySymbol();
        $orders = Order::where('user_id', $u->id)->latest('id')->limit(25)->get()->map(function ($o) use ($sym) {
            $items = $o->orderDetails->map(function ($d) {
                $p = Product::find($d->product_id);
                return ['name' => $p ? $p->getTranslation('name') : '#' . $d->product_id, 'variation' => $this->readable($p, $d->variation)];
            });
            return [
                'code'     => $o->code,
                'date'     => date('d M Y', $o->date),
                'total'    => (float) $o->orderDetails->sum('price'),
                'payment'  => $o->payment_type,
                'status'   => $o->delivery_status,
                'currency' => $sym,
                'items'    => $items,
            ];
        });
        return response()->json(['auth' => true, 'orders' => $orders]);
    }

    private function readable($product, $variation)
    {
        return $product ? $this->variationLabel($product, $variation) : $variation;
    }
}
