import { FC, useEffect } from 'react';
import './app.scss';

interface IApp {
  children?: any;
}

const App:FC<IApp>  = props => {
  useEffect(() => {
    wx.cloud.init({
      env: 'cloudtaosu-6g6zzl8k54cf61f4'
    })
  }, [])

  return props.children

}

export default App
