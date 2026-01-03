import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ThemeToggle from "./components/ThemeToggle";

// Componente de diagnóstico: verifica si hay reglas `.dark` y muestra estilos computados
function DebugRules() {
  useEffect(() => {
    // Buscar reglas CSS que contengan `.dark` o `dark\:` y listar hojas
    const found = [] as string[];
    const sheetsInfo = [] as string[];
    try {
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          const href = (sheet as CSSStyleSheet).href || ((sheet as any).ownerNode && (sheet as any).ownerNode.tagName === 'STYLE' ? 'inline' : 'unknown');
          const rules = Array.from((sheet as CSSStyleSheet).cssRules || []);
          sheetsInfo.push(href + ` (${rules.length})`);

          for (const rule of rules) {
            const txt = (rule as CSSStyleRule).selectorText || "";
            if (txt.includes('.dark') || txt.includes('dark\:')) {
              found.push(`${href} -> ${txt}`);
            }
          }
        } catch (e) {
          sheetsInfo.push('inaccessible sheet');
        }
      }
    } catch (e) {}

    console.log("DebugRules: styleSheets:", sheetsInfo.slice(0, 20));
    console.log("DebugRules: found rules containing .dark or dark:\\:", found.slice(0, 30));

    const logComputed = () => {
      const test = document.getElementById('theme-test');
      if (test) {
        const st = getComputedStyle(test);
        console.log('DebugRules: computed background-color:', st.backgroundColor, 'color:', st.color);
      }
    };

    // log initial
    logComputed();

    // observar cambios en la clase de <html>
    const mo = new MutationObserver(() => {
      console.log('DebugRules: detected class change on <html>, classList:', document.documentElement.className);
      logComputed();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => mo.disconnect();
  }, []);
  return (
    <div className="p-4">
      <div id="theme-test" className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-4 rounded">
        Prueba de estilos (bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300)
      </div>
    </div>
  );
}

function App() {
  const [showDebug, setShowDebug] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-blue-600 dark:text-blue-300">Hola mundo</h1>

      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
            <div className="space-x-6">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/about" className="hover:underline">About</Link>
            </div>
            <ThemeToggle />
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>

          <button className="m-4 p-2 border" onClick={() => setShowDebug((s) => !s)}>Toggle Debug</button>
          {showDebug && <DebugRules />}
        </div>
      </Router>
    </div>
  );
}

export default App;
