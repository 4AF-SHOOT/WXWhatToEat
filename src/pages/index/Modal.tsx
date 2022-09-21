import { FC, useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtFloatLayout, AtInput, AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/float-layout.scss" // 按需引入
import './index.scss'

interface IModal {
  isShow: boolean;
  setIsShow: any;
}

const Modal:FC<IModal>  = props => {
  const {isShow, setIsShow} = props;
  const [inpVal, setInpVal] = useState('');

  // const getFoods = async () => {
  //   try {
  //     const cloudResult = await wx.cloud.callFunction({
  //       name: 'getFoods'
  //     })

  //     console.log("success-------------", cloudResult.result)
  //     setFoods(cloudResult.result.foods);
  //   } catch (error) {
  //     console.log("error-------------", error)
  //   }
  // }

  const handleClose = () => {
    console.log('handleClose')
    setIsShow(false);
  }

  const handleConfirm = () => {
    console.log('handleConfirm')
    setIsShow(false);
  }

  const handleChange = (val) => {
    console.log(val, 'val')
    setInpVal(val);
    return val;
  }

  return <AtFloatLayout isOpened={isShow} title='想吃啥呢' onClose={handleClose}>
    <AtInput
      name='whatToEat'
      title='想吃'
      type='text'
      placeholder='...'
      autoFocus={true}
      value={inpVal}
      onChange={handleChange}
    />
    <AtButton type='secondary' size='small' full={false} className='confirmBtn'>确定</AtButton>
  </AtFloatLayout>

}

export default Modal
