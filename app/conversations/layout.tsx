import React, { ReactNode } from 'react'
import { SideBar } from '../components/SideBar'
import { ConversationList } from './components/ConversationList'
import getConversations from '../actions/getConversation';
import { getUser } from '../actions/getUser';


 async function  ConversationLayout({ children }: { children: ReactNode }) {
   const conversations = await getConversations();
   const users = await getUser();

  return (
      <SideBar>
      <ConversationList
      users={users}
      initialItems={conversations!}
      />
    {
        children
    }
   </SideBar>
  )
}

export default ConversationLayout