
import './App.css';

function App() {

    let NEAR_DISTANCE = 15;

    window.addEventListener('load', () => {
        let domContainer = document.getElementById('container');
        let domMask = document.getElementById('lines');
        let domHoriMagnet = domMask.querySelector('.hori');
        let domVertMagnet = domMask.querySelector('.vert');

        function genBlock() {
            let block = document.createElement('span');
            block.style.width = '50px'
            block.style.height = '50px'
            block.style.top = '50px'
            block.style.left = '50px'
            block.style.backgroundColor = 'red'
            block.style.opacity = (0.25+Math.random()*0.75);
            block.classList.add('block');
            return block;
        }

        let globalMagnet = new window.Magnet().distance(NEAR_DISTANCE);
        console.log(globalMagnet,'globalMagnet')
        let magnets = [];
        Array.prototype.forEach.call(domContainer.querySelectorAll('.group'), function(dom) {
            let magnet = new window.Magnet().distance(NEAR_DISTANCE);
            console.log(magnet,'magnet')
            let doms = [];
            for (let bInx=3; 0<bInx; bInx--) {
                let block = genBlock(dom);
                block.addEventListener('mousedown', function(e) {
                    this.style.zIndex = 10;
                    console.log(e,'wqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
                });
                block.addEventListener('click', function() {
                    this.style.zIndex = 1;
                    console.log(2)
                    dom.appendChild(this);
                });


                dom.appendChild(block);
                doms.push(block);
            }
            magnets.push({
                magnet: magnet,
                doms: doms
            });
        });
        function setAttract() {
            globalMagnet.clear();
            magnets.forEach((obj) => obj.magnet.clear());
            (() => {
                return [globalMagnet.add(magnets.map((obj) => obj.doms))];
                // if (this.checked) {
                //     return [globalMagnet.add(magnets.map((obj) => obj.doms))];
                // } else {
                //     return magnets.map((obj) => obj.magnet.add(obj.doms));
                // }
            })().forEach((magnet) => magnet.on('magnetstart', (e) => {
                console.log('magnetstart');
            }).on('magnetend', (e) => {

                domHoriMagnet.classList.remove('show');
                domVertMagnet.classList.remove('show');
            }).on('magnetchange', (e) => {
                console.log('magnetchange',e);
                let result = e.detail;
                console.log('magnetchange', e);
                domHoriMagnet.classList.remove('show');
                domVertMagnet.classList.remove('show');
                let resultX = result.x;
                let resultY = result.y;
                if (resultX) {
                    domVertMagnet.style.left = (resultX.position+'px');
                    domVertMagnet.classList.add('show');
                }
                if (resultY) {
                    domHoriMagnet.style.top = (resultY.position+'px');
                    domHoriMagnet.classList.add('show');
                }
            }));
        };
        setAttract();
    });

  return (
   <div>
     <div id="lines">
       <span className="vert"></span>
       <span className="hori"></span>
     </div>
     <div id="container">
       <div className="group"></div>
     </div>
   </div>
  );
}

export default App;
