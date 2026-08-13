import { LanguageProvider } from './i18n/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Products from './components/Products'
import Industries from './components/Industries'
import Partners from './components/Partners'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <Overview />
        <Products />
        <Industries />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App
