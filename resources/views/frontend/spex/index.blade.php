@extends('frontend.layouts.app')
@section('meta_title', 'SPEX — Eyewear + AR Try-On | ' . get_setting('website_name'))
@php
    $sf = [
        'class' => 'sf-spex', 'brand' => 'SPEX',
        'ac' => '#2b6df6', 'bg' => '#eef1f5', 'surf' => '#ffffff', 'ink' => '#12151b', 'muted' => '#6b7280', 'line' => 'rgba(0,0,0,.1)', 'on' => '#ffffff',
        'font' => "'Space Grotesk',sans-serif", 'fontimport' => 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap',
        'eb' => 'Eyewear · live AR try-on', 'h1' => 'See sharper.', 'p' => 'Sunglasses, blue-cut and optical frames — try them on your face before you buy.',
        'cta' => 'Shop frames →', 'h2' => 'Frames', 'sub' => 'Try before you buy.',
        'imgkw' => ['spex-sun' => 'sunglasses', 'spex-blue' => 'eyeglasses', 'spex-optical' => 'eyeglasses,round'],
    ];
@endphp
@section('content')
    @include('frontend.partials.sf_store')

    <style>
        #sf-trybtn{position:fixed;right:18px;bottom:18px;z-index:150;padding:.85rem 1.4rem;border-radius:999px;border:none;cursor:pointer;background:#2b6df6;color:#fff;font-weight:700;box-shadow:0 14px 30px -10px rgba(43,109,246,.7)}
        #sf-tryon{position:fixed;inset:0;z-index:200;background:rgba(6,10,18,.82);display:none;align-items:center;justify-content:center;padding:1rem}
        #sf-tryon.on{display:flex}
        .sf-tobox{background:#0b0e14;border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:1rem;width:min(680px,96vw);color:#eef2f7;font-family:'Space Grotesk',sans-serif}
        .sf-tohead{display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem}
        .sf-tohead button{background:none;border:none;color:#eef2f7;font-size:1.4rem;cursor:pointer}
        .sf-tostage{position:relative;border-radius:14px;overflow:hidden;background:#000;aspect-ratio:4/3}
        .sf-tostage video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;visibility:hidden}
        .sf-tostage canvas{position:absolute;inset:0;width:100%;height:100%}
        .sf-tostatus{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;color:#aab3c2;font-size:.9rem;padding:1.5rem}
        .sf-tochips{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.8rem;align-items:center}
        .sf-tochips .lab{font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:#8b94a3;margin-right:.2rem}
        .sf-tofc{width:30px;height:30px;border-radius:50%;border:2px solid rgba(255,255,255,.25);cursor:pointer}
        .sf-tofc.on{border-color:#fff;box-shadow:0 0 0 2px #2b6df6}
        .sf-tonote{color:#8b94a3;font-size:.72rem;margin-top:.6rem}
    </style>
    <button id="sf-trybtn">📷 Try glasses on</button>
    <div id="sf-tryon"><div class="sf-tobox">
        <div class="sf-tohead"><b>Virtual try-on</b><button id="sf-toclose">&times;</button></div>
        <div class="sf-tostage"><video id="sf-tovideo" playsinline muted></video><canvas id="sf-tocanvas"></canvas><div class="sf-tostatus" id="sf-tostatus">Starting camera…</div></div>
        <div class="sf-tochips" id="sf-tochips"><span class="lab">Frame</span></div>
        <div class="sf-tonote">Your camera stays on your device — nothing is uploaded. Move closer for a better fit.</div>
    </div></div>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js"></script>
    <script>
    (function(){
        var COLORS=[['Black','#141414'],['Gold','#d4af37'],['Tortoise','#5b3b1a'],['Blue','#2b6df6']];
        var frameColor='#141414';
        var modal=document.getElementById('sf-tryon'),video=document.getElementById('sf-tovideo'),
            canvas=document.getElementById('sf-tocanvas'),ctx=canvas.getContext('2d'),
            statusEl=document.getElementById('sf-tostatus'),chips=document.getElementById('sf-tochips');
        var faceMesh=null,camera=null,running=false;
        COLORS.forEach(function(c,i){var b=document.createElement('button');b.className='sf-tofc'+(i===0?' on':'');b.title=c[0];b.style.background=c[1];
            b.addEventListener('click',function(){frameColor=c[1];[].forEach.call(chips.querySelectorAll('.sf-tofc'),function(x){x.classList.remove('on');});b.classList.add('on');});chips.appendChild(b);});
        function drawFrame(g,w){var h=w*0.42,r=w*0.23,off=w*0.28;g.lineWidth=Math.max(3,w*0.028);g.strokeStyle=frameColor;g.lineJoin='round';g.lineCap='round';g.fillStyle='rgba(140,170,210,0.18)';
            [-off,off].forEach(function(cx){g.beginPath();g.ellipse(cx,0,r,h*0.5,0,0,Math.PI*2);g.fill();g.stroke();});
            g.beginPath();g.moveTo(-off+r*0.7,0);g.lineTo(off-r*0.7,0);g.stroke();
            g.beginPath();g.moveTo(-off-r,0);g.lineTo(-off-r-w*0.22,-h*0.18);g.stroke();
            g.beginPath();g.moveTo(off+r,0);g.lineTo(off+r+w*0.22,-h*0.18);g.stroke();}
        function onResults(res){canvas.width=video.videoWidth||640;canvas.height=video.videoHeight||480;ctx.save();ctx.translate(canvas.width,0);ctx.scale(-1,1);ctx.drawImage(res.image,0,0,canvas.width,canvas.height);
            var lm=res.multiFaceLandmarks&&res.multiFaceLandmarks[0];
            if(lm){statusEl.style.display='none';var L=lm[33],R=lm[263],W=canvas.width,H=canvas.height,lx=L.x*W,ly=L.y*H,rx=R.x*W,ry=R.y*H,cx=(lx+rx)/2,cy=(ly+ry)/2,dx=rx-lx,dy=ry-ly,d=Math.hypot(dx,dy),ang=Math.atan2(dy,dx);
                ctx.save();ctx.translate(cx,cy);ctx.rotate(ang);drawFrame(ctx,d*2.15);ctx.restore();}else{statusEl.style.display='flex';statusEl.textContent='Look at the camera';}
            ctx.restore();}
        function start(){if(typeof FaceMesh==='undefined'||typeof Camera==='undefined'){statusEl.textContent='AR failed to load — check your connection.';return;}
            statusEl.style.display='flex';statusEl.textContent='Starting camera…';
            if(!faceMesh){faceMesh=new FaceMesh({locateFile:function(f){return 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/'+f;}});faceMesh.setOptions({maxNumFaces:1,refineLandmarks:true,minDetectionConfidence:.5,minTrackingConfidence:.5});faceMesh.onResults(onResults);}
            camera=new Camera(video,{onFrame:async function(){if(running)await faceMesh.send({image:video});},width:640,height:480});running=true;
            camera.start().catch(function(){statusEl.textContent='Camera blocked. Allow camera access and retry.';});}
        function stop(){running=false;try{camera&&camera.stop();}catch(e){}try{var s=video.srcObject;if(s)s.getTracks().forEach(function(t){t.stop();});video.srcObject=null;}catch(e){}}
        document.getElementById('sf-trybtn').addEventListener('click',function(){modal.classList.add('on');start();});
        document.getElementById('sf-toclose').addEventListener('click',function(){modal.classList.remove('on');stop();});
        modal.addEventListener('click',function(e){if(e.target===modal){modal.classList.remove('on');stop();}});
    })();
    </script>
@endsection
