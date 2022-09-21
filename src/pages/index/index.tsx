import { FC, useEffect, useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/input.scss" // 按需引入

import Modal from './Modal';
import './index.scss'

interface IIndex {
  children?: any;
}

const Index:FC<IIndex>  = props => {
  const [foods, setFoods] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [inpVal, setInpVal] = useState('123');

  useEffect(() => {
    getFoods();
  }, [])

  const getFoods = async () => {
    try {
      const cloudResult = await wx.cloud.callFunction({
        name: 'getFoods'
      })

      console.log("success-------------", cloudResult.result)
      setFoods(cloudResult.result.foods);
    } catch (error) {
      console.log("error-------------", error)
    }
  }

  const handleClick = () => {
    console.log('click')
    setIsShow(true);
  }

  const handleChange = (val) => {
    console.log(val, 'val')
    return val;
  }

  return <View className='whatToEat'>
    <Modal isShow={isShow} setIsShow={setIsShow} />
    <View className='tagWrap'>
      {
        foods.map((it, ix) => {
          return <Text
            key={ix}
            className='tag'
            style={{color: 'red', borderColor: 'red'}}
          >{it.food_name}</Text>
        })
      }
      <Text onClick={handleClick} className='addTag'>+</Text>
    </View>
    <Text>今天吃啥？</Text>
    <AtButton type='primary' circle={true} size='small' full={false} className='eatBtn'>看看吃啥</AtButton>
  </View>

}

export default Index
