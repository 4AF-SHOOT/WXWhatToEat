import { FC, useEffect, useRef, useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { AtButton, AtMessage } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/input.scss" // 按需引入
import "taro-ui/dist/style/components/message.scss" // 按需引入

import Modal from './Modal';
import './index.scss'

interface IIndex {
  children?: any;
}

const mockFoods = [
  {
    food_name: '火锅'
  },
  {
    food_name: '烤肉'
  },
  {
    food_name: '123'
  },
  {
    food_name: '海底捞'
  },
  {
    food_name: '麻辣烫'
  },
  {
    food_name: '啊啊'
  },
  {
    food_name: '凉皮'
  },
  {
    food_name: '做饭'
  },
  {
    food_name: '火锅'
  },
  {
    food_name: '烤肉'
  },
  {
    food_name: '123'
  },
  {
    food_name: '海底捞'
  },
  {
    food_name: '麻辣烫'
  },
  {
    food_name: '啊啊'
  },
  {
    food_name: '凉皮'
  },
  {
    food_name: '做饭'
  },
  {
    food_name: '火锅'
  },
  {
    food_name: '烤肉'
  },
  {
    food_name: '123'
  },
  {
    food_name: '海底捞'
  },
  {
    food_name: '麻辣烫'
  },
  {
    food_name: '啊啊'
  },
  {
    food_name: '凉皮'
  },
  {
    food_name: '做饭'
  },
  {
    food_name: '火锅'
  },
  {
    food_name: '烤肉'
  },
  {
    food_name: '123'
  },
  {
    food_name: '海底捞'
  },
  {
    food_name: '麻辣烫'
  },
  {
    food_name: '啊啊'
  },
  {
    food_name: '凉皮'
  },
  {
    food_name: '做饭'
  },
  {
    food_name: '火锅'
  },
  {
    food_name: '烤肉'
  },
  {
    food_name: '123'
  },
  {
    food_name: '海底捞'
  },
  {
    food_name: '麻辣烫'
  },
  {
    food_name: '啊啊'
  },
  {
    food_name: '凉皮'
  },
  {
    food_name: '做饭'
  },
  {
    food_name: '火锅'
  },
  {
    food_name: '烤肉'
  },
  {
    food_name: '123'
  },
  {
    food_name: '海底捞'
  },
  {
    food_name: '麻辣烫'
  },
  {
    food_name: '啊啊'
  },
  {
    food_name: '凉皮'
  },
  {
    food_name: '做饭'
  }
]

const Index:FC<IIndex>  = props => {
  const [foods, setFoods] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [eatRes, setEatRes] = useState('啥？');
  const [isStarted, setIsStarted] = useState(false);
  const timerRef = useRef(null);


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
      // setFoods(mockFoods);
    } catch (error) {
      console.log("error-------------", error)
    }
  }

  const handleClick = () => {
    console.log('click')
    setIsShow(true);
  }

  const random = () => {
    const len = foods.length;
    return Math.floor(Math.random() * len) % len;
  }

  const handleEatBtn = () => {
    if (!isStarted) {
      timerRef.current = setInterval(() => {
        const randomNum = random();
        setEatRes(`${foods[randomNum].food_name}！`);
      }, 80)
    } else {
      timerRef.current && clearInterval(timerRef.current);
    }
    
    setIsStarted(!isStarted);
  }

  return <View className='whatToEat'>
    <AtMessage />
    <Modal isShow={isShow} setIsShow={setIsShow} foods={foods} setFoods={setFoods} />
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
    <Text className='whatToEat_randomText'>今天吃{eatRes}</Text>
    <AtButton type='primary' circle={true} size='small' full={false} className='eatBtn' onClick={handleEatBtn}>{!isStarted ? '开始！' : '停止！'}</AtButton>
  </View>

}

export default Index
