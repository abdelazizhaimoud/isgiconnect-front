import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../css/components/HeaderList.module.css'
import cn from 'classnames/bind'

function HeaderList() {
  const c = cn.bind(styles)
  return (
    <div className={c('HeaderList')}>
      <div className={c("elem")}><Link className={c('textStyleRemoval')} to="/accueil">ACCUEIL</Link></div>
      <div className={c("elem")}><Link className={c('textStyleRemoval')} to="/apropos">APROPOS</Link></div>
      <div className={c("elem")}><Link className={c('textStyleRemoval')} to="/contacter">CONTACTER</Link></div>
    </div>
  )
}

export default HeaderList
