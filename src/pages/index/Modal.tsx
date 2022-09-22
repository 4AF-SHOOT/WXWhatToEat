import { FC, useState } from 'react'
import { Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtFloatLayout, AtInput, AtButton } from 'taro-ui'
import "taro-ui/dist/style/components/float-layout.scss" // 按需引入

interface IModal {
  isShow: boolean;
  setIsShow: any;
  setFoods: any;
  foods: Array<any>;
}

const Modal:FC<IModal>  = props => {
  const {isShow, setIsShow, setFoods, foods} = props;
  const [inpVal, setInpVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addFoods = async (data) => {
    console.log('======================', data)
      return wx.cloud.callFunction({
        name: 'add',
        data: {
          foods: data
        }
      })
  }

  const handleClose = () => {
    console.log('handleClose')
    setInpVal('');
    setIsShow(false);
  }

  const handleBtnClick = async () => {
    console.log('handleBtnClick', inpVal);
    setIsLoading(true);
    const inpFoodArr = inpVal.replace(/,/g, '，').split('，').map(it => {
      return {
        food_name: it
      }
    });

    try {
      await addFoods(inpFoodArr);
      setFoods(foods.concat(inpFoodArr));
      Taro.atMessage({
        'message': '添加成功~',
        'type': 'success',
      })
      setInpVal('');
      setIsShow(false);
      setIsLoading(false);
    } catch(err) {
      console.log(err)
      Taro.atMessage({
        'message': '添加失败',
        'type': 'error',
      })
      setIsLoading(false);
    }
  }

  const handleChange = (val) => {
    console.log(val, 'val')
    setInpVal(val);
    return val;
  }

  return <AtFloatLayout isOpened={isShow} title='想吃啥呢' onClose={handleClose} className='eatModal'>
    <AtInput
      name='whatToEat'
      title='想吃'
      type='text'
      placeholder='....'
      autoFocus={true}
      value={inpVal}
      onChange={handleChange}
    />
    <Text className='modalDesc'>多个想吃的之间用&apos;,&apos;分隔</Text>
    <AtButton
      type='secondary'
      size='small'
      full={false}
      className='modalConfirmBtn'
      onClick={handleBtnClick}
      loading={isLoading}
      disabled={isLoading}
    >确定</AtButton>
  </AtFloatLayout>

}

export default Modal
