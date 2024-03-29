import { create } from 'zustand';

interface ActiveStore {
    members: string[],
    remove: (id: string) => void,
    add: (id: string) => void,
    set:(ids:string[])=>void,
    
}

const activeUserList = create<ActiveStore>((set) => ({
    members: [],
    add: (id) => set((state) => ({ members: [...state.members, id] })),
    remove: (id) => set((state) => ({ members: state.members.filter((memberId) => memberId !== id) })),
    set: (ids) => set({ members: ids })
}));

export default activeUserList;