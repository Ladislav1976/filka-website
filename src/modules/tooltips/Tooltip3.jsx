import classNames from 'classnames'
import { useState, useRef } from 'react'
import TooltipContent from './TooltipContent'

export default function Tooltip({
  children: tooltipTarget,
  tooltipContent,
}) {

  const [show, setShow] = useState(false)



  const handleShowToolTip = () => {
    console.log("onMouseEnter")
    const toolTipHalfWidth =
      targetRef.current.getBoundingClientRect().width / 2
    const toolTipHeight =
      targetRef.current.getBoundingClientRect().height

    setToolTipProperties({
      tooltipTop: toolTipHeight,
      tooltipLeft: toolTipHalfWidth,
    })

    setShow(true)
  }

  return (
    <div
      ref={targetRef}
      onMouseEnter={handleShowToolTip}
      onMouseLeave={() => setShow(false)}
      className={classNames(
        show && 'pb-6', // Make sure tooltip doesn't close when moving cursor to content
        "inline relative"
      )}
    >
      {/* Putting content inside this div allows it to stay open when hovering over content */}
      <TooltipContent
        show={show}
        top={toolTipProperties.tooltipTop}
        left={toolTipProperties.tooltipLeft}
      >
        {tooltipContent}
      </TooltipContent>
      <span className="cursor-pointer">{tooltipTarget}</span>
    </div>
  )
}