import React, { useCallback } from 'react'
import styles from './index.less'

// 函数式分页
export default function Pagination(props) {

    const pageTotal = useCallback(() => {
        const { total, pageSize } = props
        let pt = total / pageSize
        if(total % pageSize != 0) {
            pt = Math.floor(pt) + 1
        }
        return pt
    },[props.total, props.pageSize])
    
    return (
        <div className={styles.pagination}>
            {
                (props.current != 1 || pageTotal() < 1) && (
                    <span className={styles.prev} onClick={() => props.onChange('prev', props.current)}></span>
                ) 
            }
            <span className={styles.current}>{props.current}</span>
            <span className={styles.line}>{'/'}</span>
            <span className={styles.total}>{pageTotal()}</span>
            {
                (pageTotal() > 1 && pageTotal() > props.current) && (
                    <span className={styles.next} onClick={() => props.onChange('next', props.current)}></span>
                ) 
            }
        </div>
    )
}