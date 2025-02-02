import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  const [syncEnabled, setSyncEnabled] = useState(true);

  const handleMessageSend = (message: string) => {
    // TODO: Implement backend communication
    console.log('Sending message:', message);
  };

  const handleSync = () => {
    setSyncEnabled(!syncEnabled);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="grid grid-cols-2 gap-4 h-[calc(100vh-2rem)]">
        <ChatInterface
          onMessageSend={handleMessageSend}
          onSync={handleSync}
          synced={syncEnabled}
        />
        <ChatInterface
          onMessageSend={handleMessageSend}
          onSync={handleSync}
          synced={syncEnabled}
        />
      </div>
    </div>
  );
};

export default Index;