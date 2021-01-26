import React from 'react'
import styles from './index.less'

// 类 分页
export default class Pagination extends React.Component {


    pageTotal = () => {
        const { total, pageSize } = this.props
        let pt = total / pageSize
        if(total % pageSize != 0) {
            pt = Math.floor(pt) + 1
        }
        return pt
    }
    render() {
        const { current,  onChange } = this.props
        const PTotal = this.pageTotal()
        return (
            <div className={styles.pagination}>
                {
                    (current != 1 && PTotal > 1) && (
                        <span className={styles.prev} onClick={() => onChange('prev', current)}></span>
                    ) 
                }
                <span className={styles.current}>{current}</span>
                <span className={styles.line}>{'/'}</span>
                <span className={styles.total}>{PTotal}</span>
                {
                    (PTotal > 1 && PTotal > current) && (
                        <span className={styles.next} onClick={() => onChange('next', current)}></span>
                    ) 
                }
            </div>
        )
    }
}