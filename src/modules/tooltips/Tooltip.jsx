import classNames from 'classnames'
import { useState, useRef } from 'react'
import TooltipContent from './TooltipContent'
import style from "./Tooltip.module.css";

export default function Tooltip({
  text, children,
}) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
     className={style.toolTipContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
>{children}
{isVisible && <div className={style.tooltip}>{text}</div>}
    </div>
  )
}