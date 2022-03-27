import css from './Spinner.module.css'

import { Spin } from 'antd';

function Spinner(props) {
    return (
        <Spin tip="Загрузка..." size='large' spinning={props.spinning} className={css.spinnerBlock}>
            {props.children}
        </Spin>
    )
}

export default Spinner;
