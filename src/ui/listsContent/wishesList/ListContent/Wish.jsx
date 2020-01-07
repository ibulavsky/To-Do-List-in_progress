import React, {useEffect, useState} from "react"
import {Checkbox, Icon, Input, Select} from 'antd'
import styles from './Wish.module.css'
import {useDispatch} from "react-redux"
import {deleteWish, updateWish} from "../../../../bll/ListsReducer"

const Wish = ({wishItem, listId}) => {

    const [isChangeModeShow, setChangeModeShow] = useState(false)
    const [wishTitle, changeWishTitle] = useState(wishItem.title)
    const {Option} = Select;
    // console.log(`checked ${props.item.id} ${props.item.title} - ${props.item.priority} `)

    useEffect(() => {
        changeWishTitle(wishItem.title)
    }, [wishItem.title])

//redux
    const dispatch = useDispatch();

    const onPriorityChange = (value) => {
        dispatch(updateWish(listId, wishItem.id, {priority: value}))
        console.log(`priority selected ${value} - id ${wishItem.id}`);
    }
    const onUpdateWish = () => {
        dispatch(updateWish(listId, wishItem.id, {title: wishTitle}))
        setChangeModeShow(false)
    }
    const onDeleteWish = () => dispatch(deleteWish(listId, wishItem.id))
    const onChangeWishStatus = (e) => {
        dispatch(updateWish(listId, wishItem.id, {status: (e.target.checked)}))
    }

    return (
        <>
            <span className={styles.listContainer}>
                <>
                {isChangeModeShow ? <>
                        <Input placeholder="Wish name" value={wishTitle}
                               autoFocus
                               onChange={(e) => changeWishTitle(e.currentTarget.value)}
                               onPressEnter={onUpdateWish}/>
                        <Icon type="check-circle" className={styles.icon} onClick={onUpdateWish}/>
                        <Icon type="undo" className={styles.icon} onClick={() => setChangeModeShow(false)}/>
                    </>
                    : <>
                        <Checkbox className={styles.check} checked={wishItem.status}
                                  onChange={(e) => onChangeWishStatus(e)}> </Checkbox>
                        <article className={styles.text}>
                            {wishItem.title}
                        </article>
                        <Select defaultValue={wishItem.priority} style={{width: 120}} className={styles.priority}
                                onChange={(value) => onPriorityChange(value)}>
                            <Option value={3}>High</Option>
                            <Option value={2}>Medium</Option>
                            <Option value={1}>Low</Option>
                        </Select>
                        <Icon type="edit" className={styles.icon} onClick={() => setChangeModeShow(true)}/>
                        <Icon type="delete" className={styles.icon} onClick={onDeleteWish}/>
                    </>
                }
                </>
            </span>
        </>
    )
}

export default Wish
