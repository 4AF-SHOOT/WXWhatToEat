import { FC, useEffect, useRef, useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { AtButton, AtMessage, AtActivityIndicator } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/input.scss" // 按需引入
import "taro-ui/dist/style/components/message.scss" // 按需引入
import "taro-ui/dist/style/components/activity-indicator.scss" // 按需引入
import "taro-ui/dist/style/components/loading.scss" // 按需引入

import Modal from './Modal';
import './index.scss'

interface IIndex {
  children?: any;
}

const colorArr = ['rgba(46, 156, 255, 1)', 'rgba(19, 194, 194, 1)', 'rgba(255, 173, 67, 1)', 'rgba(255, 95, 100, 1)', 'rgba(255, 144, 183, 1)', 'rgba(144, 113, 255, 1)', 'rgba(96, 202, 255, 1)', 'rgba(70, 207, 82, 1)', 'rgba(182, 237, 44, 1)', 'rgba(255, 149, 108, 1)', 'rgba(255, 129, 62, 1)', 'rgba(151, 158, 255, 1)', 'rgba(75, 255, 247, 1)', 'rgba(255, 218, 81, 1)', 'rgba(235, 99, 245, 1)', 'rgba(31, 130, 255, 1)', 'rgba(117, 178, 255, 1)', 'rgba(81, 236, 187, 1)', 'rgba(114, 255, 154, 1)', 'rgba(245, 99, 175, 1)', 'rgba(159, 222, 4, 1)'];
const Index:FC<IIndex>  = props => {
  const [foods, setFoods] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [eatRes, setEatRes] = useState('啥？');
  const [isStarted, setIsStarted] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const timerRef = useRef(null);
  const colorLen = colorArr.length;

  useEffect(() => {
    getFoods();
  }, [])

  const getFoods = async () => {
    try {
      const cloudResult = await wx.cloud.callFunction({
        name: 'getFoods'
      })

      setFoods(cloudResult.result.foods);
      setIsLoad(false);
    } catch (error) {
      console.log("error-------------", error)
      setIsLoad(false);
    }
  }

  const handleClick = () => {
    console.log('click')
    setIsShow(true);
  }

  const random = (len) => {
    return Math.floor(Math.random() * len) % len;
  }

  const handleEatBtn = () => {
    if (!isStarted) {
      timerRef.current = setInterval(() => {
        const randomNum = random(foods.length);
        setEatRes(`${foods[randomNum].food_name}！`);
      }, 50)
    } else {
      timerRef.current && clearInterval(timerRef.current);
    }
    
    setIsStarted(!isStarted);
  }

  const getColorRgba = (rgba) => {
    const colorArrTemp = rgba.split(',');
    colorArrTemp[3] = '0.5)';
    const _borderColor = colorArrTemp.join(',');
    colorArrTemp[3] = '0.1)';
    const _bgColor = colorArrTemp.join(',');

    return {
      _color: rgba,
      _bgColor: _bgColor,
      _borderColor: _borderColor
    };
  }

  return isLoad
  ? <View className='whatToEatLoadingWrap'>
      <AtActivityIndicator size={62} isOpened={true} mode='center' content='请等一下！'></AtActivityIndicator>
    </View>
  : <View className='whatToEat'>
      <AtMessage />
      <Modal isShow={isShow} setIsShow={setIsShow} foods={foods} setFoods={setFoods} />
      <View className='tagWrap'>
        {
          foods.map((it, ix) => {
            const colorRandomNum = random(colorLen);
            const _color = colorArr[colorRandomNum];
            const {_bgColor, _borderColor} = getColorRgba(_color);
            return <Text
              key={ix}
              className='tag'
              style={{color: _color, borderColor: _borderColor, backgroundColor: _bgColor}}
            >{it.food_name}</Text>
          })
        }
        <Text onClick={handleClick} className='addTag'>+</Text>
      </View>
      <Text className='whatToEat_randomText'>今天吃{eatRes}</Text>
      <AtButton type='primary' circle={true} size='small' full={false} className='eatBtn' onClick={handleEatBtn}>{!isStarted ? '开始！' : '停止！'}</AtButton>
    </View>

}

export default Index
