import React, { useState, useEffect } from 'react';
import '../../App.css';
import Modal from "react-modal";
import axios from 'axios';
import './landing.css';
import Main from '../Main/Main';
import { Statistic } from 'antd';

Modal.setAppElement("#root")

const { Countdown } = Statistic;
const deadline = new Date('December 23, 2021 17:00:00 GMT+01:00').getTime();

export default function Landing() {
  const [type, setType] = useState('auth');
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const authenticate = async e => {
    e.preventDefault();
    try {
      console.log('talking to gatekeeper');
      const res = await axios.get('/authenticate', { params: { email: 'user', password: password } });
      console.log('allowed in');
      if (res.data.type !== undefined) {
        setType(res.data.type);
      } else { console.log('cannot recognise you mate'); }
    } catch (e) {
      console.log(e);
    }
  };

  const readCookie = async () => {
    try {
      console.log('reading history');
      const res = await axios.get('/read-cookie');
      console.log('found presence');
      if (res.data.type !== undefined) {
        setType(res.data.type);
      } else { console.log('cannot recognise you mate'); }
    } catch (e) {
      setType('auth');
      console.log('error 501');
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return(
    <div className="App" >{ type === 'auth' ?
      <div className="main-container">
        <div className="app-logo"></div>
        <div className="login-wrapper" >
          <h1 style={{ marginTop: -30, fontFamily: 'Rajdhani' }}>GWPAW 2021</h1>
          <p style={{ marginTop: -50, marginBottom: 20 }}>DEC 14-17 2021, HANNOVER</p>
          <h2 style={{ marginTop: 10, fontFamily: 'Rajdhani' }}>VOTING PAGE</h2>
          <p style={{ marginTop: -30, color:'orange', fontSize:16 }}>VOTING ENDED AT 23 DEC 2021 17:00 CET</p>
          <p style={{ fontWeight: 800, color:'white', fontSize:28 }}>WINNERS</p>
          <p style={{ marginTop: 0, color:'white', fontSize:22 }}><a href="https://solscan.io/token/EkFg7wou6shRx2mpGdKHic9EDVxmbWnv7NnxZunEfEyj" target="_" style={{ fontWeight: 600, color:'skyblue', fontSize:22, textDecoration:'none' }}>JÁNOS TAKÁTSY</a></p>
          <p style={{ marginTop: 0, color:'white', fontSize:22 }}><a href="https://solscan.io/token/AAy9CzPuUeVoZL5qadfKFpPrkf8SA1mX8PhyT3Dsaui7" target="_" style={{ fontWeight: 600, color:'skyblue', fontSize:22, textDecoration:'none' }}>YUMENG XU</a></p>
          {/*<Countdown title="VOTING ENDED AT 23 DEC 2021 17:00 CET" value={deadline} format="D:HH:m:s" style={{ marginTop: -40, color:'orange', fontWeight:600 }} />
          <h5 style={{ fontSize:24, marginTop: 30 }}>USE REGISTRATION TOKEN TO ACCESS THE VOTING PAGE</h5>
          <button className="button-help" onClick={toggleModal}>Where is my token?</button>
          <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel=""
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
          >
            <div style={{display:'flex'}}>
              <span style={{ fontSize:16, fontWeight:600, marginTop:10 }}>Your token is in an email with the subject "Your registration for the Gravitational Wave Physics and Astronomy Workshop 2021", sent by <span style={{ color:'blue' }}>gwpaw2021@aei.mpg.de</span> when you first registered on the GWPAW website.</span>
            </div>
            <div style={{ marginTop:10 }}>
              <button style={{ background:'black', color:'white', display:'flex', marginLeft:'85%' }} onClick={toggleModal}><span style={{ fontFamily:'Rajdhani', fontSize:16, fontWeight:600 }}>CLOSE</span></button>
            </div>
          </Modal>
          <p style={{ fontSize:16, fontWeight:600, marginTop: 10, color: 'white' }}>NOTE: If you have already voted, you won't be able to access the voting page. Shoo!</p>
          <p style={{ fontSize:16, fontWeight:600, marginTop: -10, color: 'yellow' }}>HELP DESK: inplco@protonmail.com</p>
          <form onSubmit={authenticate} style={{ marginTop: -10 }}>
            <label>
              <input placeholder="registered email" type="text" onChange={e => setUsername(e.target.value)} style={{ fontFamily: 'Rajdhani', fontSize: 16 }} />
              <br></br>
              <input disabled="true" placeholder="token" type="password" onChange={e => setPassword(e.target.value)} style={{ fontFamily: 'Rajdhani', fontSize:16, marginTop:10 }} />
            </label>
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              <button type="submit" className="button-outline"><span className="raj">LOG IN</span></button>
            </div>
            <br></br><br></br>
          </form>
          */}
        </div>
        <div className="footer" style={{ position:'fixed' }}>
          <div>
            <img alt="logo" className="thumbnailjs" src="/gwpaw2021/nodejs.svg"/>
            <img alt="logo" className="thumbnailjs" src="/gwpaw2021/reactjs.png"/>
            <img alt="logo" className="thumbnailgit" src="/gwpaw2021/github.png"/><a href="https://github.com/inplco/gwpaw2021" target="_">github.com/inplco/gwpaw2021</a>
          </div>
          <div style={{ marginTop:-13 }}>
            <p>Powered by <a href="http://inpl.one" target = "_">Interplanetary Company</a><sup>TM</sup></p>
          </div>
        </div>
      </div>
      : <Main/> }
    </div>
  )
}
