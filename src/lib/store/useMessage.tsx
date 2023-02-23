import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useMessage = create(
   combine({ showModal: false, message: '' }, (set) => ({
      setErrorMessage: (msg: string) => set(() => ({ message: msg })),
   }))
)

export default useMessage
