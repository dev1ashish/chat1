import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Index = () => {
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [interfaces, setInterfaces] = useState([1, 2]); // Start with 2 interfaces

  const handleMessageSend = (message: string) => {
    // TODO: Implement backend communication
    console.log('Sending message:', message);
  };

  const handleSync = () => {
    setSyncEnabled(!syncEnabled);
  };

  const addInterface = () => {
    setInterfaces(prev => [...prev, prev.length + 1]);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mb-4 flex justify-end">
        <Button onClick={addInterface} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Chat Interface
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
        {interfaces.map((id) => (
          <ChatInterface
            key={id}
            onMessageSend={handleMessageSend}
            onSync={handleSync}
            synced={syncEnabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;