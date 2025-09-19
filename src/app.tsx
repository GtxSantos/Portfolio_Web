import { useEffect, useState, useMemo, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Rocket, Code, Palette, Sparkles, Copy } from 'lucide-react';

// --- DADOS DO PORTFÓLIO  --- //
interface PortfolioData {
  name: string;
  role: string;
  about: string;
  contactEmail: string;
  githubUrl: string;
  linkedinUrl: string;
  profileImageUrl: string;
  skills: Array<{
    icon: any;
    title: string;
    desc: string;
  }>;
  projects: Array<{
    title: string;
    tech: string;
    image: string;
  }>;
}

const portfolioData: PortfolioData = {
  name: "Gustavo Santos",
  role: "Desenvolvedor Full Stack & Especialista em IA",
  about: "Desenvolvedor Full Stack apaixonado por Inteligência Artificial, com sólida experiência em tecnologias cloud e DevOps. Proficiente em Python e arquiteturas cloud-native, com expertise em AWS, Kubernetes, Docker, Terraform e Azure. Possuo inglês nível C1 Business, permitindo comunicação fluente em ambientes internacionais.",
  contactEmail: "mailto:gt.santosx04@gmail.com",
  githubUrl: "https://github.com/GtxSantos",
  linkedinUrl: "https://www.linkedin.com/in/gustavo-santos-076729321",
  profileImageUrl: "https://i.imgur.com/YTCfLb0.png",
  
  skills: [
    { 
      icon: Code, 
      title: "Desenvolvimento", 
      desc: "Python, AWS, Docker, Kubernetes" 
    },
    { 
      icon: Rocket, 
      title: "DevOps & Cloud", 
      desc: "Terraform, Azure, AWS, CI/CD" 
    },
    { 
      icon: Palette, 
      title: "IA & Machine Learning", 
      desc: "Sistemas de Recomendação, IA" 
    }
  ],
  projects: [
    { 
      title: "Sistema de Recomendação de Filmes", 
      tech: "Python, Machine Learning, APIs", 
      image: "https://github.com/GtxSantos/sistema-recomenda-filmes/raw/main/img/screenshot-final.png" 
    },
    { 
      title: "Calculadora Neumórfica", 
      tech: "HTML, CSS, JavaScript, Design System", 
      image: "https://github.com/GtxSantos/Calculadora/raw/main/Imagens/screenshot-projeto.png" 
    },
    { 
      title: "E-commerce Full Stack", 
      tech: "Python, AWS, Docker, Kubernetes", 
      image: "https://i.imgur.com/luejhGf.png" 
    },
    { 
      title: "Cloud Infrastructure", 
      tech: "Terraform, AWS, Azure, Kubernetes", 
      image: "https://i.imgur.com/fFRhfuB.png" 
    },
    { 
      title: "CI/CD Pipeline", 
      tech: "GitHub Actions, Docker, Kubernetes", 
      image: "https://i.imgur.com/Tp6KC1k.png" 
    },
    { 
      title: "Microservices Architecture", 
      tech: "Python, Docker, Kubernetes, AWS", 
      image: "https://i.imgur.com/r7g2RGO.png" 
    }
  ]
};

const clouds = [
  { top: '15%', left: '20%', scale: 1.2, delay: '0s' },
  { top: '25%', left: '75%', scale: 0.9, delay: '2s' },
  { top: '40%', left: '35%', scale: 1.4, delay: '1s' },
  { top: '35%', left: '85%', scale: 0.8, delay: '3s' },
  { top: '55%', left: '25%', scale: 1.1, delay: '2.5s' },
  { top: '65%', left: '65%', scale: 1.3, delay: '1.5s' },
];


function App() {
  const [scrollY, setScrollY] = useState(0);
  const mainContainerRef = useRef<HTMLElement>(null);

  // --- Estados para as funcionalidades da Gemini API ---
  const [bio, setBio] = useState(portfolioData.about);
  const [isBioLoading, setIsBioLoading] = useState(false);
  const [generatedIcebreaker, setGeneratedIcebreaker] = useState('');
  const [isIcebreakerLoading, setIsIcebreakerLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerHeight = mainContainerRef.current?.scrollHeight || 0;
  const scrollableHeight = containerHeight - window.innerHeight;
  const scrollProgress = scrollableHeight > 0 ? Math.min(scrollY / scrollableHeight, 1) : 0;

  // Gerar estrelas aleatórias
  const stars: Star[] = useMemo(() => {
    return Array.from({ length: 400 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: Math.random() * 1.5 + 0.5, // Aumentei o tamanho
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 2 + 2}s`
    }));
  }, []);

  // --- Funções da Gemini API ---

  const callGeminiAPI = async (prompt: string) => {
    // A forma correta e segura de usar a chave da API
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
    
    if (!apiKey) {
      console.error("ERRO: A chave VITE_GEMINI_API_KEY não foi encontrada. Verifique seu arquivo .env.local e reinicie o servidor.");
      return "Erro de configuração: Chave da API não encontrada.";
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: {
        parts: [{ text: "Você é um assistente de escrita criativo que ajuda a gerar textos curtos em português. Responda apenas com o texto solicitado, sem introduções ou explicações adicionais." }]
      },
       generationConfig: {
        temperature: 0.8,
        topP: 1,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      ],
    };

    try {
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(`API call failed: ${response.status}`);
      const result = await response.json();
      
      console.log("Resposta da API Gemini:", JSON.stringify(result, null, 2));

      const candidate = result.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text;

      if (!text) {
        const reason = candidate?.finishReason || "desconhecido";
        console.error(`Não foi possível extrair o texto. Motivo: ${reason}`, candidate);
        return `A IA não retornou um texto. Motivo: ${reason}.`;
      }
      
      return text.replace(/(\*\*|Opção \d:)/g, '').trim();
      
    } catch (error) {
      console.error('Erro ao chamar a API Gemini:', error);    
      return "Ocorreu um erro ao contatar a IA.";
    }
  };

  const handleGenerateBio = async (tone: string) => {
    setIsBioLoading(true);
    const prompt = `Reescreva a seguinte biografia de um desenvolvedor em um tom mais ${tone}, mantendo o sentido original, em português. Retorne APENAS o parágrafo reescrito, sem nenhum texto adicional, cabeçalhos ou opções: "${portfolioData.about}"`;
    const newBio = await callGeminiAPI(prompt);
    setBio(newBio);
    setIsBioLoading(false);
  };

  const handleGenerateIcebreaker = async () => {
    setIsIcebreakerLoading(true);
    const prompt = `Gere UMA frase curta, criativa e amigável para iniciar um email para um desenvolvedor chamado ${portfolioData.name}, cujo portfólio tem um tema de viagem do céu ao espaço. A frase deve ser em português. Retorne APENAS a frase, sem aspas ou texto adicional.`;
    const newIcebreaker = await callGeminiAPI(prompt);
    setGeneratedIcebreaker(newIcebreaker);
    setIsIcebreakerLoading(false);
  };

  const copyToClipboard = () => {
    if (!navigator.clipboard) {
      const textArea = document.createElement("textarea");
      textArea.value = generatedIcebreaker;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess('Copiado!');
      setTimeout(() => setCopySuccess(''), 2000);
      return;
    }
    navigator.clipboard.writeText(generatedIcebreaker).then(() => {
      setCopySuccess('Copiado!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  const getDynamicClass = (threshold: number, dayClass: string, nightClass: string) => scrollProgress < threshold ? dayClass : nightClass;

  return (
    <div className="bg-gray-950">
      <div className="fixed inset-0 transition-colors duration-500 ease-in-out z-0" style={{ backgroundColor: `hsl(222, ${Math.max(17, 47 - scrollProgress * 60)}%, ${Math.max(8, 93 - scrollProgress * 140)}%)` }} />
      <div className="fixed inset-0 z-[1] transition-opacity duration-1000" style={{ opacity: Math.max(0, 1 - scrollProgress * 3.5), background: 'linear-gradient(to bottom, white 60%, #dbeafe)' }}>
        {clouds.map((cloud, i) => (
          <div 
            key={i} 
            className="absolute w-72 h-24 -translate-x-1/2 cloud"
            style={{ 
              top: cloud.top,
              left: cloud.left,
              transform: `scale(${cloud.scale}) translateX(-50%)`,
              animationDelay: cloud.delay,
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
              borderRadius: '50px',
            }}
          >
            <div 
              className="absolute -bottom-8 left-6 w-36 h-36"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }}
            />
            <div 
              className="absolute -bottom-6 right-10 w-44 h-44"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }}
            />
          </div>
        ))}
      </div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[2]">
        {stars.map((star: Star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.scale}px`,
              height: `${star.scale}px`,
              opacity: scrollProgress > 0.3 ? Math.random() * 0.9 + 0.3 : 0,
              animation: `twinkle ${star.animationDuration} infinite ease-in-out`,
              animationDelay: star.animationDelay,
              boxShadow: `0 0 ${star.scale * 2}px rgba(255, 255, 255, 0.8)`,
              transition: 'opacity 1s ease-in-out'
            }}
          />
        ))}
      </div>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className={`flex gap-6 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-500 ${getDynamicClass(0.15, 'bg-white/50 text-gray-900', 'bg-white/10 text-white border border-white/20')}`}>
          <a href="#inicio" className="hover:scale-110 transition-transform">Início</a>
          <a href="#sobre" className="hover:scale-110 transition-transform">Sobre</a>
          <a href="#projetos" className="hover:scale-110 transition-transform">Projetos</a>
          <a href="#contato" className="hover:scale-110 transition-transform">Contato</a>
        </div>
      </nav>
      <main ref={mainContainerRef} className="relative z-10">
        <section id="inicio" className="min-h-screen flex items-center justify-center p-6">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
    
    <div className="md:order-2">
      <img 
        src={portfolioData.profileImageUrl} 
        alt={`Foto de ${portfolioData.name}`}
        className={`w-48 h-48 md:w-64 md:h-64 rounded-full object-cover transition-all duration-1000 shadow-2xl ${getDynamicClass(0.3, 'border-8 border-white shadow-blue-200', 'border-4 border-blue-400/50 shadow-blue-500/30')}`} 
      />
    </div>
    
    <div className="md:order-1">
      <h1 className={`text-5xl md:text-7xl font-black mb-4 transition-colors duration-1000 ${getDynamicClass(0.3, 'text-gray-900', 'text-white')}`}>{portfolioData.name}</h1>
      <p className={`text-xl md:text-2xl mb-8 transition-colors duration-1000 ${getDynamicClass(0.3, 'text-blue-600', 'text-blue-200')}`}>{portfolioData.role}</p>
      <div className="flex gap-6 justify-center md:justify-start">
        <a href={portfolioData.githubUrl} aria-label="Github" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${getDynamicClass(0.3, 'bg-blue-100 text-blue-600 hover:bg-blue-200', 'bg-white/20 text-white hover:bg-white/30')}`}><Github /></a>
        <a href={portfolioData.linkedinUrl} aria-label="Linkedin" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${getDynamicClass(0.3, 'bg-blue-100 text-blue-600 hover:bg-blue-200', 'bg-white/20 text-white hover:bg-white/30')}`}><Linkedin /></a>
        <a href={portfolioData.contactEmail} aria-label="Email" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${getDynamicClass(0.3, 'bg-blue-100 text-blue-600 hover:bg-blue-200', 'bg-white/20 text-white hover:bg-white/30')}`}><Mail /></a>
      </div>
    </div>

  </div>
  <a href="#sobre" aria-label="Rolar para baixo" className="absolute bottom-10 animate-bounce"><ChevronDown size={32} className={`transition-colors duration-1000 ${getDynamicClass(0.3, 'text-blue-600', 'text-white')}`} /></a>
</section>
        <section id="sobre" className="min-h-screen container mx-auto px-6 py-20 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl md:text-5xl font-bold mb-8 transition-colors duration-1000 ${getDynamicClass(0.5, 'text-gray-800', 'text-white')}`}>Sobre Mim</h2>
            <div className={`p-6 rounded-xl backdrop-blur-sm transition-all duration-500 mb-8 ${getDynamicClass(0.5, 'bg-white/60', 'bg-black/20')}`}>
              <p className={`text-lg md:text-xl leading-relaxed transition-colors duration-1000 ${getDynamicClass(0.5, 'text-gray-700', 'text-blue-100')}`}>{isBioLoading ? "Gerando nova bio..." : bio}</p>
            </div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className={`font-semibold transition-colors duration-1000 ${getDynamicClass(0.5, 'text-gray-700', 'text-blue-100')}`}>✨ Reescrever com IA:</span>
              {['Profissional', 'Criativo', 'Poético'].map(tone => <button key={tone} onClick={() => handleGenerateBio(tone)} disabled={isBioLoading} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-50 ${getDynamicClass(0.5, 'bg-blue-500 text-white hover:bg-blue-600', 'bg-sky-400/50 text-white hover:bg-sky-400/80')}`}>{tone}</button>)}
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {portfolioData.skills.map(skill => <div key={skill.title} className={`p-6 rounded-xl backdrop-blur-sm transition-all duration-500 hover:scale-105 ${getDynamicClass(0.5, 'bg-white/80 text-gray-900', 'bg-white/10 text-white border border-white/20')}`}><skill.icon className="w-12 h-12 mx-auto mb-4" /><h3 className="text-xl font-semibold mb-2">{skill.title}</h3><p className="opacity-80">{skill.desc}</p></div>)}
            </div>
          </div>
        </section>
        <section id="projetos" className="min-h-screen container mx-auto px-6 py-20 flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">Projetos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
            {portfolioData.projects.map(project => <a href="#" key={project.title} className="block group rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:!scale-105 hover:-translate-y-2 bg-white/10 border border-white/20"><div className="aspect-video overflow-hidden"><img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div><div className="p-6"><h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3><p className="text-sm text-blue-200">{project.tech}</p></div></a>)}
          </div>
        </section>
        <section id="contato" className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
          {/* Portal Effect */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Camada base do portal */}
            <div
              className="absolute top-1/2 left-1/2 w-[800px] h-[800px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                animation: 'portalFloat 8s ease-in-out infinite',
              }}
            />

            {/* Anel externo girando */}
            <div
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border-[2px] border-blue-500/30 rounded-full pointer-events-none"
              style={{
                animation: 'portalSpin 20s linear infinite',
              }}
            />

            {/* Anel interno girando (direção oposta) */}
            <div
              className="absolute top-1/2 left-1/2 w-[400px] h-[400px] border-[4px] border-blue-400/40 rounded-full pointer-events-none"
              style={{
                animation: 'portalSpin 15s linear infinite reverse',
              }}
            />

            {/* Centro do portal */}
            <div
              className="absolute top-1/2 left-1/2 w-[300px] h-[300px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                animation: 'portalGlow 5s ease-in-out infinite',
              }}
            />

            {/* Efeito de brilho central */}
            <div
              className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-blue-500/20 rounded-full pointer-events-none"
              style={{
                filter: 'blur(40px)',
                transform: 'translate(-50%, -50%)',
                animation: 'portalFloat 4s ease-in-out infinite',
              }}
            />

            {/* Partículas flutuantes */}
            {[...Array(20)].map((_, i: number) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/80 rounded-full pointer-events-none"
                style={{
                  top: `${50 + (Math.random() - 0.5) * 40}%`,
                  left: `${50 + (Math.random() - 0.5) * 40}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: `portalFloat ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Conteúdo */}
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">
              Vamos Criar Algo<br/>Extraordinário
            </h2>
            <p className="text-xl md:text-2xl text-blue-200 mb-12">
              Entre em contato e transforme suas ideias em realidade
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <a
                href={portfolioData.contactEmail}
                className="group relative px-12 py-4 overflow-hidden rounded-full backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-colors duration-300"
              >
                <span className="relative z-10 text-xl font-semibold text-white group-hover:scale-110 transition-transform duration-300 inline-block">
                  Iniciar Conversa
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
                </div>
              </a>

              <div className="w-full max-w-md">
                <button
                  onClick={handleGenerateIcebreaker}
                  disabled={isIcebreakerLoading}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-white rounded-full font-semibold hover:bg-blue-500/30 transition-all duration-300 disabled:opacity-50"
                >
                  <Sparkles size={20} />
                  {isIcebreakerLoading ? 'Gerando...' : '✨ Gerar quebra-gelo'}
                </button>
                
                {generatedIcebreaker && (
                  <div className="relative mt-4 p-4 text-left backdrop-blur-sm bg-black/30 rounded-lg border border-blue-500/30">
                    <p className="text-blue-100 pr-10">"{generatedIcebreaker}"</p>
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-2 right-2 p-2 rounded-full hover:bg-blue-500/20 transition-colors"
                    >
                      {copySuccess ? (
                        <span className="text-xs text-blue-300">{copySuccess}</span>
                      ) : (
                        <Copy size={16} className="text-white" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

// Defina a interface Star
interface Star {
  id: number;
  left: string;
  top: string;
  scale: number;
  animationDelay: string;
  animationDuration: string;
}