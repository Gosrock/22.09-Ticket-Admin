import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { QrReader } from 'react-qr-reader';
import {
  checkCount,
  checkPage
} from '../../../state/actions-creators/CheckPage';
import './video.css';
import { ReactComponent as Scanner } from './scanner.svg';
import history from '../../../history';
import { message } from 'antd';

function CheckPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const sucAudio = new Audio(process.env.PUBLIC_URL + '/successSound.mp3');
  const errAudio = new Audio(process.env.PUBLIC_URL + '/errorSound.mp3');

  const { data, pending, count } = useSelector(state => state.checkPage);

  useEffect(() => {
    if (!history.location.state) {
      history.push('ticket/checkenter');
    }

    // console.log('history.location.state:', history.location.state); //result: '{date: 'OB', cam: 'environment'}'
    // console.log('location:', location); //result: '{pathname: '/tickets/check', search: '', hash: '', state: {…}, key: 'xf82gqmb'}'
  }, [location]);

  const handleScan = (result, error) => {
    dispatch(
      checkPage(
        { uuid: result ? result.text : null },
        { date: history.location.state.date },
        message,
        { sucAudio },
        { errAudio }
      )
    );

    dispatch(checkCount());
    // console.log('count:', count);
  };

  return (
    <>
      <QrReader
        delay={500}
        onResult={handleScan}
        constraints={{ facingMode: `${history.location.state.cam}` }}
        videoStyle={{}}
        videoContainerStyle={{
          display: 'block',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          paddingTop: '0'
        }}
      />
      <div class="app__overlay">
        <div class="app__overlay-frame"></div>
        {/* <!-- Scanner animation --> */}
        <Scanner />
        <div class="custom-scanner"></div>
        <div class="app__help-text"></div>
      </div>
    </>
  );
}

export default CheckPage;
