'use client'
import { CheckBoxStateType, TabStateType } from './Home'
import config from '@/public/static/homepage/config.json' assert { type: 'json' }
import sendToMixpanel from '@/src/app/lib/sendToMixpanel'
import { BUILDER_IDEA_CLICK, BUILDER_IDEA_CLICK_PROPERTY } from '@/public/static/mixpanel/event-name'
export default function TabPage({
  state,
  setState,
}: {
  state: TabStateType
  setState: React.Dispatch<React.SetStateAction<TabStateType>>
  setCheckBox: React.Dispatch<React.SetStateAction<CheckBoxStateType>>
}) {
  function handleChangeIndex(index: number) {
    setState((prev) => ({ ...prev, index: index }))
  }

  const tab = config['tab']
  return (
    <div className=" mt-[2rem] flex flex-col gap-4 ">
      <div className="flex justify-between gap-4 border-b">
        <div className="flex gap-8 ">
          {tab.map((item, i) => (
            <a
              href={`#${item.text.toLowerCase()}`}
              key={i}
              id={'#' + item.text.toLowerCase()}
              onClick={() => {
                handleChangeIndex(i)
                sendToMixpanel(BUILDER_IDEA_CLICK, {[BUILDER_IDEA_CLICK_PROPERTY]:item.text})
              }}
              className={`${
                item.index === state.index ? 'text-slate-900' : 'text-slate-500'
              } hover:text-primaryRed  cursor-pointer flex items-center gap-2 px-4 py-1.5 relative`}
            >
              {item.index === state.index && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primaryRed animate-slideup"></div>
              )}
              <h6 className="font-rubik text-lg font-normal">{item.text}</h6>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
