import { useState } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Why from '@/components/Why';
import Team from '@/components/Team';
import Process from '@/components/Process';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ChatWidget from '@/components/ChatWidget';

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Work />
      <Why />
      <Team />
      <Process />
      <Footer />
      <ScrollToTop hidden={chatOpen} />
      <ChatWidget onOpenChange={setChatOpen} />
    </>
  );
}

export default App;
