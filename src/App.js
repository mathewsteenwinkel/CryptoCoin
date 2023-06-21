import './App.css';
import React, { useEffect } from 'react';
import Header from './header';
import Footer from './Footer';

function App() {
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=Bitcoin%2CEthereum%2CTether%2CBNB%2CDogecoin%2CShibainu&vs_currencies=cad&include_24hr_change=true')
      .then(res => res.json())
      .then(json => {
        const coins = Object.getOwnPropertyNames(json);

        for (let coin of coins) {
          const coinInfo = json[coin];
          const price = coinInfo.cad;
          const change = coinInfo.cad_24h_change;

          let changeText = "";
          if (change !== undefined) {
            changeText = change.toFixed(5);
          }

          const coinElement = document.createElement("div");
          coinElement.className = `coin ${change < 0 ? 'falling' : 'rising'}`;
          coinElement.innerHTML = `
            <div class='coin-logo'>
              <img src='../images/${coin}.png'/>
            </div>
            <div class='coin-name'>
              <h3>${coin}</h3>
              <span>CAD</span>
            </div>
            <div class='coin-price'>
              <span class="price">${price}</span>
              <span class="change">${changeText}</span>
            </div>
          `;

          const container = document.querySelector(".container");
          container.appendChild(coinElement);
        }
      });
  }, []);

  return (
    <>
    <div className='lrgbody'>
    <Header />
    <div className="container"></div>
    <Footer/>
    </div>
    </>
  );
}

export default App;

