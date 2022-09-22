import { FC, useState } from 'react'
import { Text, Input } from '@tarojs/components'
import { AtFloatLayout, AtInput, AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/float-layout.scss" // 按需引入
import "taro-ui/dist/style/components/loading.scss" // 按需引入
import './index.scss'

interface IModal {
  isShow: boolean;
  setIsShow: any;
}

const Modal:FC<IModal>  = props => {
  const {isShow, setIsShow} = props;
  const [inpVal, setInpVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addFoods = async () => {
      return wx.cloud.callFunction({
        name: 'add',
        data: {
          foods: inpVal
        }
      })
  }

  const handleClose = () => {
    console.log('handleClose')
    setInpVal('');
    setIsShow(false);
  }

  const handleBtnClick = async () => {
    console.log('handleBtnClick', inpVal)
    setIsLoading(true);
    try {
      await addFoods();
      setInpVal('');
      setIsShow(false);
      setIsLoading(false);
    } catch(err) {
      console.log(err)
      setIsLoading(false);
    }
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
    <AtButton
      type='secondary'
      size='small'
      full={false}
      className='confirmBtn'
      onClick={handleBtnClick}
      loading={isLoading}
      disabled={isLoading}
    >确定</AtButton>
  </AtFloatLayout>

}

export default Modal
