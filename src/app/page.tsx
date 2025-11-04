"use client"

import { useState, useEffect } from 'react'
import { Calculator, Dumbbell, Apple, Trophy, Calendar, Home, Menu, X, Play, Clock, Target, CheckCircle, Star, Users, TrendingUp, CreditCard, Zap, User, LogOut, Crown, Lock } from 'lucide-react'
import { getCurrentUser, signOut, checkPremiumStatus, User as UserType } from '@/lib/auth'
import AuthModal from '@/components/AuthModal'
import PremiumBlock from '@/components/PremiumBlock'
import PremiumVideo from '@/components/PremiumVideo'

export default function FitnessSite() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  
  // Estados para calculadora de gordura corporal
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [neck, setNeck] = useState('')
  const [waist, setWaist] = useState('')
  const [hip, setHip] = useState('')
  const [bodyFatResult, setBodyFatResult] = useState(null)

  // Estados para treinos
  const [selectedWorkoutLevel, setSelectedWorkoutLevel] = useState('beginner')
  const [selectedWorkoutType, setSelectedWorkoutType] = useState('full-body')
  const [completedExercises, setCompletedExercises] = useState(new Set())

  // Estados para dieta
  const [selectedDietPlan, setSelectedDietPlan] = useState('weight-loss')
  const [dailyCalories, setDailyCalories] = useState(null)

  // Estados para desafio 21 dias
  const [challengeDay, setChallengeDay] = useState(1)
  const [completedDays, setCompletedDays] = useState(new Set())
  const [challengeStarted, setChallengeStarted] = useState(false)

  // Verificar usuário logado
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const isPremium = checkPremiumStatus(user)

  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
      setActiveSection('home')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleUpgradeClick = () => {
    if (!user) {
      setAuthModalOpen(true)
    } else {
      // Redirecionar para o Mercado Pago
      window.open('https://mpago.li/1M1Mt85', '_blank')
    }
  }

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'calculator', label: 'Calculadora', icon: Calculator },
    { id: 'workouts', label: 'Treinos', icon: Dumbbell, premium: true },
    { id: 'diet', label: 'Dieta', icon: Apple, premium: true },
    { id: 'challenge', label: 'Desafio 21 Dias', icon: Trophy, premium: true },
  ]

  // Dados dos treinos (apenas prévia para não-premium)
  const workoutPreview = {
    name: 'Treino Full Body - Iniciante (Prévia)',
    duration: '30-40 min',
    exercises: [
      { name: 'Agachamento', sets: 3, reps: '12-15', rest: '60s', description: 'Pés na largura dos ombros, desça até 90°' },
      { name: 'Flexão (joelhos)', sets: 3, reps: '8-12', rest: '60s', description: 'Flexão apoiando os joelhos no chão' },
      { name: 'Prancha', sets: 3, reps: '20-30s', rest: '45s', description: 'Mantenha o corpo reto, contraindo o abdômen' }
    ]
  }

  const workoutPlans = {
    beginner: {
      'full-body': {
        name: 'Treino Full Body - Iniciante',
        duration: '30-40 min',
        exercises: [
          { name: 'Agachamento', sets: 3, reps: '12-15', rest: '60s', description: 'Pés na largura dos ombros, desça até 90°' },
          { name: 'Flexão (joelhos)', sets: 3, reps: '8-12', rest: '60s', description: 'Flexão apoiando os joelhos no chão' },
          { name: 'Prancha', sets: 3, reps: '20-30s', rest: '45s', description: 'Mantenha o corpo reto, contraindo o abdômen' },
          { name: 'Afundo', sets: 2, reps: '10 cada perna', rest: '60s', description: 'Passo à frente, desça até 90°' },
          { name: 'Polichinelo', sets: 3, reps: '30s', rest: '30s', description: 'Exercício cardio para aquecimento' },
          { name: 'Elevação lateral', sets: 2, reps: '12-15', rest: '45s', description: 'Com garrafas de água como peso' }
        ]
      },
      'upper-body': {
        name: 'Treino Membros Superiores - Iniciante',
        duration: '25-35 min',
        exercises: [
          { name: 'Flexão (joelhos)', sets: 3, reps: '8-12', rest: '60s', description: 'Flexão apoiando os joelhos' },
          { name: 'Tríceps no banco', sets: 3, reps: '10-12', rest: '60s', description: 'Use uma cadeira ou banco' },
          { name: 'Elevação lateral', sets: 3, reps: '12-15', rest: '45s', description: 'Com garrafas de água' },
          { name: 'Rosca bíceps', sets: 3, reps: '12-15', rest: '45s', description: 'Com garrafas de água' },
          { name: 'Prancha', sets: 2, reps: '20-30s', rest: '45s', description: 'Fortalece core e braços' }
        ]
      },
      'lower-body': {
        name: 'Treino Membros Inferiores - Iniciante',
        duration: '25-35 min',
        exercises: [
          { name: 'Agachamento', sets: 3, reps: '15-20', rest: '60s', description: 'Movimento básico fundamental' },
          { name: 'Afundo', sets: 3, reps: '10 cada perna', rest: '60s', description: 'Alterna as pernas' },
          { name: 'Elevação de panturrilha', sets: 3, reps: '15-20', rest: '45s', description: 'Na ponta dos pés' },
          { name: 'Ponte', sets: 3, reps: '15-20', rest: '45s', description: 'Deitado, eleve o quadril' },
          { name: 'Agachamento sumo', sets: 2, reps: '12-15', rest: '60s', description: 'Pés mais afastados' }
        ]
      }
    },
    intermediate: {
      'full-body': {
        name: 'Treino Full Body - Intermediário',
        duration: '45-55 min',
        exercises: [
          { name: 'Agachamento com salto', sets: 4, reps: '12-15', rest: '60s', description: 'Agachamento explosivo com salto' },
          { name: 'Flexão tradicional', sets: 4, reps: '12-15', rest: '60s', description: 'Flexão completa no chão' },
          { name: 'Burpee', sets: 3, reps: '8-10', rest: '90s', description: 'Exercício completo e intenso' },
          { name: 'Prancha lateral', sets: 3, reps: '30s cada lado', rest: '45s', description: 'Fortalece oblíquos' },
          { name: 'Mountain climber', sets: 3, reps: '20 cada perna', rest: '60s', description: 'Cardio e core' },
          { name: 'Afundo com salto', sets: 3, reps: '10 cada perna', rest: '60s', description: 'Afundo alternado com salto' },
          { name: 'Pike push-up', sets: 3, reps: '8-12', rest: '60s', description: 'Flexão para ombros' }
        ]
      },
      'upper-body': {
        name: 'Treino Membros Superiores - Intermediário',
        duration: '40-50 min',
        exercises: [
          { name: 'Flexão tradicional', sets: 4, reps: '12-15', rest: '60s', description: 'Flexão completa' },
          { name: 'Flexão diamante', sets: 3, reps: '8-12', rest: '60s', description: 'Mãos em formato diamante' },
          { name: 'Pike push-up', sets: 3, reps: '10-12', rest: '60s', description: 'Foco nos ombros' },
          { name: 'Tríceps no banco', sets: 4, reps: '12-15', rest: '60s', description: 'Versão mais intensa' },
          { name: 'Prancha com toque', sets: 3, reps: '10 cada lado', rest: '45s', description: 'Prancha tocando ombros' },
          { name: 'Flexão archer', sets: 2, reps: '5 cada lado', rest: '90s', description: 'Flexão unilateral' }
        ]
      },
      'lower-body': {
        name: 'Treino Membros Inferiores - Intermediário',
        duration: '40-50 min',
        exercises: [
          { name: 'Agachamento pistol (assistido)', sets: 3, reps: '5 cada perna', rest: '90s', description: 'Agachamento unilateral' },
          { name: 'Afundo búlgaro', sets: 3, reps: '12 cada perna', rest: '60s', description: 'Pé traseiro elevado' },
          { name: 'Agachamento com salto', sets: 4, reps: '15-20', rest: '60s', description: 'Explosivo' },
          { name: 'Ponte unilateral', sets: 3, reps: '10 cada perna', rest: '45s', description: 'Uma perna por vez' },
          { name: 'Cossaco squat', sets: 3, reps: '8 cada lado', rest: '60s', description: 'Agachamento lateral' },
          { name: 'Wall sit', sets: 3, reps: '45-60s', rest: '60s', description: 'Isométrico na parede' }
        ]
      }
    },
    advanced: {
      'full-body': {
        name: 'Treino Full Body - Avançado',
        duration: '60-75 min',
        exercises: [
          { name: 'Burpee com flexão', sets: 5, reps: '10-12', rest: '90s', description: 'Burpee completo com flexão' },
          { name: 'Agachamento pistol', sets: 4, reps: '8 cada perna', rest: '2min', description: 'Agachamento unilateral completo' },
          { name: 'Flexão archer', sets: 4, reps: '8 cada lado', rest: '90s', description: 'Flexão unilateral avançada' },
          { name: 'Muscle-up (assistido)', sets: 3, reps: '3-5', rest: '2min', description: 'Movimento avançado de barra' },
          { name: 'Prancha com peso', sets: 4, reps: '45-60s', rest: '60s', description: 'Prancha com mochila' },
          { name: 'Jump squat 180°', sets: 3, reps: '8-10', rest: '90s', description: 'Agachamento com giro' },
          { name: 'Handstand push-up', sets: 3, reps: '3-8', rest: '2min', description: 'Flexão de mão (parada)' },
          { name: 'Single leg deadlift', sets: 3, reps: '10 cada perna', rest: '60s', description: 'Peso morto unilateral' }
        ]
      },
      'upper-body': {
        name: 'Treino Membros Superiores - Avançado',
        duration: '55-65 min',
        exercises: [
          { name: 'Flexão archer', sets: 4, reps: '10 cada lado', rest: '90s', description: 'Flexão unilateral' },
          { name: 'Handstand push-up', sets: 4, reps: '5-10', rest: '2min', description: 'Flexão de mão' },
          { name: 'Flexão com palmas', sets: 3, reps: '8-12', rest: '90s', description: 'Flexão explosiva' },
          { name: 'Muscle-up (assistido)', sets: 3, reps: '3-5', rest: '2min', description: 'Movimento de barra avançado' },
          { name: 'Prancha lateral com peso', sets: 3, reps: '30s cada lado', rest: '60s', description: 'Com mochila ou peso' },
          { name: 'Typewriter pull-up', sets: 3, reps: '5 cada lado', rest: '2min', description: 'Barra unilateral' }
        ]
      },
      'lower-body': {
        name: 'Treino Membros Inferiores - Avançado',
        duration: '55-65 min',
        exercises: [
          { name: 'Agachamento pistol', sets: 4, reps: '10 cada perna', rest: '2min', description: 'Unilateral completo' },
          { name: 'Shrimp squat', sets: 3, reps: '5 cada perna', rest: '2min', description: 'Agachamento avançado' },
          { name: 'Jump squat com peso', sets: 4, reps: '12-15', rest: '90s', description: 'Com mochila pesada' },
          { name: 'Dragon squat', sets: 3, reps: '8 cada perna', rest: '90s', description: 'Movimento complexo' },
          { name: 'Single leg hip thrust', sets: 4, reps: '12 cada perna', rest: '60s', description: 'Ponte unilateral' },
          { name: 'Calf raise unilateral', sets: 3, reps: '15 cada perna', rest: '45s', description: 'Panturrilha uma perna' }
        ]
      }
    }
  }

  // Dados das dietas
  const dietPlans = {
    'weight-loss': {
      name: 'Plano de Emagrecimento',
      description: 'Déficit calórico controlado para perda de peso saudável',
      calories: '1200-1500 kcal/dia',
      meals: [
        {
          name: 'Café da Manhã',
          time: '7:00 - 8:00',
          options: [
            '2 ovos mexidos + 1 fatia de pão integral + 1 fruta',
            'Vitamina: 1 banana + 200ml leite desnatado + 1 col. aveia',
            'Tapioca com queijo branco + suco natural'
          ]
        },
        {
          name: 'Lanche da Manhã',
          time: '10:00 - 10:30',
          options: [
            '1 fruta + 10 castanhas',
            'Iogurte natural + granola',
            'Vitamina de frutas vermelhas'
          ]
        },
        {
          name: 'Almoço',
          time: '12:00 - 13:00',
          options: [
            'Peito de frango grelhado + arroz integral + feijão + salada',
            'Peixe assado + batata doce + legumes refogados',
            'Carne magra + quinoa + brócolis + cenoura'
          ]
        },
        {
          name: 'Lanche da Tarde',
          time: '15:30 - 16:00',
          options: [
            'Chá verde + 2 biscoitos integrais',
            '1 iogurte + frutas vermelhas',
            'Smoothie verde (couve + maçã + gengibre)'
          ]
        },
        {
          name: 'Jantar',
          time: '19:00 - 20:00',
          options: [
            'Sopa de legumes + peito de peru',
            'Salada completa + omelete de 2 ovos',
            'Peixe grelhado + legumes no vapor'
          ]
        }
      ]
    },
    'muscle-gain': {
      name: 'Plano de Ganho de Massa',
      description: 'Superávit calórico com foco em proteínas para hipertrofia',
      calories: '2000-2500 kcal/dia',
      meals: [
        {
          name: 'Café da Manhã',
          time: '7:00 - 8:00',
          options: [
            '3 ovos + 2 fatias pão integral + abacate + leite',
            'Panqueca de aveia + whey protein + banana',
            'Vitamina hipercalórica: banana + aveia + pasta amendoim + leite'
          ]
        },
        {
          name: 'Lanche da Manhã',
          time: '10:00 - 10:30',
          options: [
            'Mix de castanhas + frutas secas',
            'Sanduíche integral com peito de peru',
            'Shake de whey + banana + aveia'
          ]
        },
        {
          name: 'Almoço',
          time: '12:00 - 13:00',
          options: [
            'Frango + arroz + feijão + batata doce + salada + azeite',
            'Carne vermelha magra + macarrão integral + legumes',
            'Salmão + arroz integral + aspargos + abacate'
          ]
        },
        {
          name: 'Pré-treino',
          time: '15:00 - 15:30',
          options: [
            'Banana + pasta de amendoim',
            'Tapioca com mel',
            'Shake pré-treino + carboidrato'
          ]
        },
        {
          name: 'Pós-treino',
          time: '17:00 - 17:30',
          options: [
            'Whey protein + banana + aveia',
            'Vitamina recuperação muscular',
            'Sanduíche com proteína + carboidrato'
          ]
        },
        {
          name: 'Jantar',
          time: '19:30 - 20:30',
          options: [
            'Peito de frango + batata doce + brócolis',
            'Peixe + arroz + legumes + azeite',
            'Carne + purê de batata + salada'
          ]
        }
      ]
    },
    'maintenance': {
      name: 'Plano de Manutenção',
      description: 'Equilíbrio calórico para manter peso atual com saúde',
      calories: '1800-2000 kcal/dia',
      meals: [
        {
          name: 'Café da Manhã',
          time: '7:00 - 8:00',
          options: [
            'Aveia + frutas + castanhas + mel',
            '2 ovos + 1 fatia pão + fruta + café',
            'Iogurte + granola + frutas vermelhas'
          ]
        },
        {
          name: 'Lanche da Manhã',
          time: '10:00 - 10:30',
          options: [
            'Fruta + oleaginosas',
            'Chá + biscoitos integrais',
            'Vitamina natural'
          ]
        },
        {
          name: 'Almoço',
          time: '12:00 - 13:00',
          options: [
            'Proteína + carboidrato + legumes + salada',
            'Prato equilibrado com todos os grupos',
            'Refeição balanceada variada'
          ]
        },
        {
          name: 'Lanche da Tarde',
          time: '15:30 - 16:00',
          options: [
            'Fruta + iogurte',
            'Chá + lanche natural',
            'Smoothie de frutas'
          ]
        },
        {
          name: 'Jantar',
          time: '19:00 - 20:00',
          options: [
            'Refeição leve e nutritiva',
            'Sopa + proteína',
            'Salada + proteína magra'
          ]
        }
      ]
    }
  }

  // Dados do desafio 21 dias
  const challengeProgram = [
    { day: 1, title: 'Início da Jornada', workout: 'Treino Full Body Leve', diet: 'Detox Natural', tip: 'Beba 2L de água hoje' },
    { day: 2, title: 'Construindo Hábitos', workout: 'Caminhada 30min', diet: 'Reduza açúcar', tip: 'Durma 8 horas' },
    { day: 3, title: 'Força Interior', workout: 'Treino Membros Superiores', diet: 'Aumente proteínas', tip: 'Medite 10 minutos' },
    { day: 4, title: 'Resistência', workout: 'Cardio Intervalado', diet: 'Mais vegetais', tip: 'Evite processados' },
    { day: 5, title: 'Equilíbrio', workout: 'Yoga/Alongamento', diet: 'Hidratação++', tip: 'Gratidão diária' },
    { day: 6, title: 'Superação', workout: 'Treino Full Body', diet: 'Refeição livre', tip: 'Descanso ativo' },
    { day: 7, title: '1ª Semana Completa!', workout: 'Descanso/Caminhada', diet: 'Planejamento', tip: 'Celebre conquistas' },
    { day: 8, title: 'Nova Energia', workout: 'HIIT 20min', diet: 'Café da manhã reforçado', tip: 'Varie exercícios' },
    { day: 9, title: 'Determinação', workout: 'Treino Pernas', diet: 'Lanches saudáveis', tip: 'Foco no objetivo' },
    { day: 10, title: 'Meio do Caminho', workout: 'Circuito Funcional', diet: 'Controle porções', tip: 'Tire fotos progresso' },
    { day: 11, title: 'Persistência', workout: 'Treino Braços', diet: 'Jante mais cedo', tip: 'Durma bem' },
    { day: 12, title: 'Força Mental', workout: 'Cardio Longo', diet: 'Hidratação constante', tip: 'Pense positivo' },
    { day: 13, title: 'Transformação', workout: 'Treino Completo', diet: 'Refeições coloridas', tip: 'Veja sua evolução' },
    { day: 14, title: '2 Semanas!', workout: 'Atividade Prazerosa', diet: 'Flexibilidade', tip: 'Orgulhe-se do progresso' },
    { day: 15, title: 'Reta Final', workout: 'Treino Intenso', diet: 'Foco total', tip: 'Visualize o resultado' },
    { day: 16, title: 'Quase Lá', workout: 'HIIT Avançado', diet: 'Disciplina máxima', tip: 'Não desista agora' },
    { day: 17, title: 'Força Máxima', workout: 'Treino Pesado', diet: 'Nutrição perfeita', tip: 'Você consegue' },
    { day: 18, title: 'Superação Total', workout: 'Desafio Pessoal', diet: 'Alimentação limpa', tip: 'Foco no final' },
    { day: 19, title: 'Quase Campeão', workout: 'Treino Completo', diet: 'Preparação final', tip: 'Mantenha o ritmo' },
    { day: 20, title: 'Último Esforço', workout: 'Treino Máximo', diet: 'Disciplina total', tip: 'Amanhã é o dia' },
    { day: 21, title: 'CAMPEÃO!', workout: 'Celebração Ativa', diet: 'Refeição especial', tip: 'Você conseguiu! 🏆' }
  ]

  const calculateBodyFat = () => {
    if (!age || !weight || !height || !neck || !waist) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    const ageNum = parseFloat(age)
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)
    const neckNum = parseFloat(neck)
    const waistNum = parseFloat(waist)
    const hipNum = gender === 'female' ? parseFloat(hip) : 0

    let bodyFat = 0

    if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistNum - neckNum) + 0.15456 * Math.log10(heightNum)) - 450
    } else {
      if (!hip) {
        alert('Para mulheres, o campo quadril é obrigatório')
        return
      }
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistNum + hipNum - neckNum) + 0.22100 * Math.log10(heightNum)) - 450
    }

    setBodyFatResult({
      percentage: Math.max(0, Math.min(50, bodyFat)).toFixed(1),
      classification: getBodyFatClassification(bodyFat, gender)
    })
  }

  const getBodyFatClassification = (bodyFat, gender) => {
    if (gender === 'male') {
      if (bodyFat < 6) return { level: 'Muito Baixo', color: 'text-blue-600' }
      if (bodyFat < 14) return { level: 'Atlético', color: 'text-green-600' }
      if (bodyFat < 18) return { level: 'Fitness', color: 'text-green-500' }
      if (bodyFat < 25) return { level: 'Aceitável', color: 'text-yellow-600' }
      return { level: 'Obesidade', color: 'text-red-600' }
    } else {
      if (bodyFat < 16) return { level: 'Muito Baixo', color: 'text-blue-600' }
      if (bodyFat < 21) return { level: 'Atlético', color: 'text-green-600' }
      if (bodyFat < 25) return { level: 'Fitness', color: 'text-green-500' }
      if (bodyFat < 32) return { level: 'Aceitável', color: 'text-yellow-600' }
      return { level: 'Obesidade', color: 'text-red-600' }
    }
  }

  const toggleExerciseComplete = (exerciseIndex) => {
    const newCompleted = new Set(completedExercises)
    if (newCompleted.has(exerciseIndex)) {
      newCompleted.delete(exerciseIndex)
    } else {
      newCompleted.add(exerciseIndex)
    }
    setCompletedExercises(newCompleted)
  }

  const completeChallengeDay = (day) => {
    const newCompleted = new Set(completedDays)
    newCompleted.add(day)
    setCompletedDays(newCompleted)
    if (day < 21) {
      setChallengeDay(day + 1)
    }
  }

  const calculateDailyCalories = () => {
    if (!age || !weight || !height) {
      alert('Preencha idade, peso e altura primeiro')
      return
    }

    const ageNum = parseFloat(age)
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)

    // Fórmula Harris-Benedict
    let bmr = 0
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum)
    } else {
      bmr = 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum)
    }

    // Fator de atividade (moderadamente ativo)
    const tdee = bmr * 1.55

    let calories = 0
    if (selectedDietPlan === 'weight-loss') {
      calories = tdee - 500 // Déficit de 500 calorias
    } else if (selectedDietPlan === 'muscle-gain') {
      calories = tdee + 300 // Superávit de 300 calorias
    } else {
      calories = tdee // Manutenção
    }

    setDailyCalories(Math.round(calories))
  }

  const handleSectionClick = (sectionId: string, isPremiumSection: boolean) => {
    if (isPremiumSection && !isPremium) {
      setAuthModalOpen(true)
      return
    }
    setActiveSection(sectionId)
  }

  const renderHome = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Você Vai Emagrecer!
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Transforme seu corpo em 21 dias com treinos personalizados, dietas balanceadas e acompanhamento completo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => handleSectionClick('challenge', true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-2"
            >
              <Zap className="w-6 h-6" />
              Começar Plano de 21 Dias
            </button>
            <button 
              onClick={handleUpgradeClick}
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Assinar Premium
            </button>
          </div>
        </div>
      </section>

      {/* Mockup do App */}
      <section className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Veja Como Funciona</h2>
          <p className="text-gray-600">Demonstração do app funcionando no seu smartphone</p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Mockup do Smartphone */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-purple-600 h-12 flex items-center justify-center">
                    <span className="text-white font-semibold">FitTransform</span>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 space-y-4">
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl">
                      <h3 className="font-bold text-purple-800 mb-2">Desafio 21 Dias</h3>
                      <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
                      <p className="text-sm text-purple-700 mt-2">Dia 15 de 21 - Continue assim!</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-green-800 mb-2">Treino de Hoje</h4>
                      <p className="text-sm text-green-700">✓ Agachamento - 3x15</p>
                      <p className="text-sm text-green-700">✓ Flexão - 3x12</p>
                      <p className="text-sm text-green-600">○ Prancha - 3x30s</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-blue-800 mb-2">Sua Dieta</h4>
                      <p className="text-sm text-blue-700">Calorias: 1.350 / 1.500</p>
                      <div className="bg-blue-200 h-2 rounded-full mt-2">
                        <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-yellow-800 mb-2">Progresso</h4>
                      <p className="text-sm text-yellow-700">Peso perdido: 8.5kg</p>
                      <p className="text-sm text-yellow-700">Gordura corporal: 18.2%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vídeo Demonstrativo */}
          <div className="flex-1">
            {isPremium ? (
              <PremiumVideo 
                title="Vídeo Demonstrativo Premium"
                description="Aprenda a usar todas as funcionalidades do app para maximizar seus resultados"
              />
            ) : (
              <div className="bg-gray-100 rounded-2xl p-8 text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play className="w-12 h-12 text-white ml-1" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Vídeo Demonstrativo</h3>
                <p className="text-gray-600 mb-6">
                  Assista como usar o app para maximizar seus resultados em apenas 21 dias
                </p>
                <div className="bg-orange-50 rounded-lg p-4 mb-6 border border-orange-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Lock className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-orange-800">Conteúdo Premium</span>
                  </div>
                  <p className="text-orange-700 text-sm">
                    Vídeos demonstrativos disponíveis apenas para assinantes premium
                  </p>
                </div>
                <button 
                  onClick={handleUpgradeClick}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Upgrade para Premium
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Calculator, title: 'Calculadora', desc: 'Calcule seu percentual de gordura corporal', action: () => setActiveSection('calculator'), premium: false },
          { icon: Dumbbell, title: 'Treinos', desc: 'Exercícios para todos os níveis', action: () => handleSectionClick('workouts', true), premium: true },
          { icon: Apple, title: 'Dietas', desc: 'Planos alimentares personalizados', action: () => handleSectionClick('diet', true), premium: true },
          { icon: Trophy, title: 'Desafio', desc: 'Transformação em 21 dias', action: () => handleSectionClick('challenge', true), premium: true }
        ].map((feature, index) => (
          <div 
            key={index} 
            onClick={feature.action}
            className={`text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 relative ${
              feature.premium && !isPremium ? 'border-2 border-orange-200' : ''
            }`}
          >
            {feature.premium && !isPremium && (
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-1">
                <Crown className="w-4 h-4" />
              </div>
            )}
            <feature.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
            {feature.premium && !isPremium && (
              <div className="mt-3 text-xs text-orange-600 font-medium">Premium</div>
            )}
          </div>
        ))}
      </section>

      {/* CTA Premium */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Upgrade para Premium</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Acesso completo a todos os treinos, dietas personalizadas, acompanhamento nutricional e suporte 24/7
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleUpgradeClick}
            className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Assinar Agora - R$ 19,90/mês
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 rounded-2xl p-8">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">50k+</div>
            <div className="text-gray-600">Brasileiros Transformados</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Exercícios Disponíveis</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-gray-600">Taxa de Sucesso</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Depoimentos Reais</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Maria Silva', result: 'Perdeu 15kg', text: 'Incrível! Em 3 meses consegui resultados que nunca imaginei. Recomendo!' },
            { name: 'João Santos', result: 'Ganhou 8kg massa', text: 'Os treinos são perfeitos e as dietas muito práticas. Mudou minha vida!' },
            { name: 'Ana Costa', result: 'Perdeu 22kg', text: 'O plano de 21 dias mudou minha vida completamente! Nunca me senti tão bem.' }
          ].map((testimonial, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
              <div className="font-semibold text-gray-800">{testimonial.name}</div>
              <div className="text-purple-600 font-medium">{testimonial.result}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  const renderCalculator = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculadora de Gordura Corporal
        </h2>
        
        <div className="space-y-6">
          {/* Gênero */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gênero</label>
            <div className="flex gap-4">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  gender === 'male' 
                    ? 'border-purple-600 bg-purple-50 text-purple-600' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Masculino
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  gender === 'female' 
                    ? 'border-purple-600 bg-purple-50 text-purple-600' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Feminino
              </button>
            </div>
          </div>

          {/* Campos de entrada */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idade (anos)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Ex: 25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Ex: 70"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Ex: 175"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pescoço (cm)</label>
              <input
                type="number"
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Ex: 38"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cintura (cm)</label>
              <input
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Ex: 85"
              />
            </div>
            {gender === 'female' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quadril (cm)</label>
                <input
                  type="number"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Ex: 95"
                />
              </div>
            )}
          </div>

          <button
            onClick={calculateBodyFat}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            Calcular Gordura Corporal
          </button>

          {bodyFatResult && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-center">Resultado</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {bodyFatResult.percentage}%
                </div>
                <div className={`text-lg font-semibold ${bodyFatResult.classification.color}`}>
                  {bodyFatResult.classification.level}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderWorkouts = () => {
    if (!isPremium) {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Treinos Personalizados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja uma prévia do nosso sistema de treinos. Upgrade para premium para acesso completo.
            </p>
          </div>

          {/* Prévia do Treino */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{workoutPreview.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{workoutPreview.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{workoutPreview.exercises.length} exercícios (prévia)</span>
                  </div>
                </div>
              </div>
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                Prévia
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {workoutPreview.exercises.map((exercise, index) => (
                <div key={index} className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">{exercise.name}</h4>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600">Séries:</span>
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{exercise.sets}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600">Repetições:</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{exercise.reps}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600">Descanso:</span>
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">{exercise.rest}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{exercise.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <PremiumBlock 
              title="Acesso Completo aos Treinos"
              description="Desbloqueie mais de 500 exercícios, treinos para todos os níveis, acompanhamento de progresso e muito mais!"
              onUpgrade={handleUpgradeClick}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Treinos Personalizados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha seu nível e tipo de treino. Todos os exercícios podem ser feitos em casa ou na academia.
          </p>
        </div>

        {/* Vídeo Demonstrativo Premium */}
        <PremiumVideo 
          title="Como Executar os Exercícios Corretamente"
          description="Vídeo exclusivo mostrando a forma correta de cada exercício para maximizar resultados e evitar lesões"
        />

        {/* Seleção de Nível */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Selecione seu Nível</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: 'beginner', name: 'Iniciante', desc: 'Começando agora', color: 'green' },
              { id: 'intermediate', name: 'Intermediário', desc: '3-6 meses de treino', color: 'yellow' },
              { id: 'advanced', name: 'Avançado', desc: '+6 meses de treino', color: 'red' }
            ].map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedWorkoutLevel(level.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedWorkoutLevel === level.id
                    ? `border-${level.color}-500 bg-${level.color}-50 text-${level.color}-700`
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold">{level.name}</div>
                <div className="text-sm text-gray-600">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Seleção de Tipo */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Tipo de Treino</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: 'full-body', name: 'Full Body', desc: 'Corpo inteiro' },
              { id: 'upper-body', name: 'Membros Superiores', desc: 'Braços, peito, costas' },
              { id: 'lower-body', name: 'Membros Inferiores', desc: 'Pernas e glúteos' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedWorkoutType(type.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedWorkoutType === type.id
                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold">{type.name}</div>
                <div className="text-sm text-gray-600">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Treino Selecionado */}
        {workoutPlans[selectedWorkoutLevel] && workoutPlans[selectedWorkoutLevel][selectedWorkoutType] && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {workoutPlans[selectedWorkoutLevel][selectedWorkoutType].name}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{workoutPlans[selectedWorkoutLevel][selectedWorkoutType].duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{workoutPlans[selectedWorkoutLevel][selectedWorkoutType].exercises.length} exercícios</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCompletedExercises(new Set())}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Resetar Treino
              </button>
            </div>

            <div className="space-y-4">
              {workoutPlans[selectedWorkoutLevel][selectedWorkoutType].exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    completedExercises.has(index)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">{exercise.name}</h4>
                        <button
                          onClick={() => toggleExerciseComplete(index)}
                          className={`p-1 rounded-full transition-colors ${
                            completedExercises.has(index)
                              ? 'text-green-600 hover:text-green-700'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <CheckCircle className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600">Séries:</span>
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{exercise.sets}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600">Repetições:</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{exercise.reps}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600">Descanso:</span>
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">{exercise.rest}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{exercise.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progresso */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">Progresso do Treino</span>
                <span className="text-purple-600 font-semibold">
                  {completedExercises.size}/{workoutPlans[selectedWorkoutLevel][selectedWorkoutType].exercises.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(completedExercises.size / workoutPlans[selectedWorkoutLevel][selectedWorkoutType].exercises.length) * 100}%`
                  }}
                ></div>
              </div>
              {completedExercises.size === workoutPlans[selectedWorkoutLevel][selectedWorkoutType].exercises.length && (
                <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
                  <div className="text-green-800 font-semibold mb-2">🎉 Parabéns! Treino Concluído!</div>
                  <div className="text-green-600 text-sm">Excelente trabalho! Descanse e hidrate-se bem.</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderDiet = () => {
    if (!isPremium) {
      return (
        <PremiumBlock 
          title="Planos Alimentares Personalizados"
          description="Acesse dietas completas para emagrecimento, ganho de massa muscular e manutenção, com cálculo de calorias e refeições detalhadas."
          onUpgrade={handleUpgradeClick}
        />
      )
    }

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Planos Alimentares</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha o plano alimentar que melhor se adequa ao seu objetivo e estilo de vida.
          </p>
        </div>

        {/* Vídeo Demonstrativo Premium */}
        <PremiumVideo 
          title="Guia Completo de Nutrição"
          description="Aprenda como montar suas refeições, calcular macros e fazer substituições inteligentes"
        />

        {/* Seleção de Plano */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Selecione seu Objetivo</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: 'weight-loss', name: 'Emagrecimento', desc: 'Perder peso com saúde', icon: TrendingUp },
              { id: 'muscle-gain', name: 'Ganho de Massa', desc: 'Aumentar massa muscular', icon: Dumbbell },
              { id: 'maintenance', name: 'Manutenção', desc: 'Manter peso atual', icon: Target }
            ].map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedDietPlan(plan.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedDietPlan === plan.id
                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <plan.icon className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">{plan.name}</div>
                <div className="text-sm text-gray-600">{plan.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculadora de Calorias */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Calcule suas Calorias Diárias</h3>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={calculateDailyCalories}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Calcular Calorias
            </button>
            {dailyCalories && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Calorias recomendadas:</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                  {dailyCalories} kcal/dia
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600">
            * Use os dados da calculadora de gordura corporal para um cálculo mais preciso
          </p>
        </div>

        {/* Plano Selecionado */}
        {dietPlans[selectedDietPlan] && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {dietPlans[selectedDietPlan].name}
              </h3>
              <p className="text-gray-600 mb-4">{dietPlans[selectedDietPlan].description}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  {dietPlans[selectedDietPlan].calories}
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {dietPlans[selectedDietPlan].meals.length} refeições/dia
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {dietPlans[selectedDietPlan].meals.map((meal, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">{meal.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{meal.time}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {meal.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Dicas Nutricionais */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Dicas Importantes</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Beba pelo menos 2-3 litros de água por dia</li>
                <li>• Faça as refeições nos horários indicados</li>
                <li>• Varie os alimentos dentro de cada grupo</li>
                <li>• Evite alimentos ultraprocessados</li>
                <li>• Consulte um nutricionista para personalização</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderChallenge = () => {
    if (!isPremium) {
      return (
        <PremiumBlock 
          title="Plano de 21 Dias"
          description="Transforme sua vida em 21 dias com nosso programa completo de exercícios, alimentação e hábitos saudáveis. Acompanhamento diário e metas progressivas."
          onUpgrade={handleUpgradeClick}
        />
      )
    }

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Plano de 21 Dias</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transforme sua vida em 21 dias com nosso programa completo de exercícios, alimentação e hábitos saudáveis.
          </p>
        </div>

        {/* Vídeo Demonstrativo Premium */}
        <PremiumVideo 
          title="Como Seguir o Plano de 21 Dias"
          description="Guia completo para maximizar seus resultados no desafio de transformação"
        />

        {!challengeStarted ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">🏆</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Pronto para o Desafio?</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              21 dias de treinos progressivos, alimentação balanceada e dicas diárias para uma transformação completa.
            </p>
            <button
              onClick={() => setChallengeStarted(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Começar Plano Agora!
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progresso Geral */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Seu Progresso</h3>
                <div className="text-purple-600 font-semibold">
                  {completedDays.size}/21 dias
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(completedDays.size / 21) * 100}%` }}
                ></div>
              </div>
              <div className="text-center text-gray-600">
                {completedDays.size === 21 ? (
                  <span className="text-green-600 font-semibold">🎉 Plano Concluído! Parabéns!</span>
                ) : (
                  <span>Faltam {21 - completedDays.size} dias para completar o plano</span>
                )}
              </div>
            </div>

            {/* Dia Atual */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                  {challengeDay}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Dia {challengeDay}: {challengeProgram[challengeDay - 1]?.title}
                  </h3>
                  <p className="text-gray-600">Seu desafio de hoje</p>
                </div>
              </div>

              {challengeProgram[challengeDay - 1] && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Dumbbell className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-800">Treino</span>
                      </div>
                      <p className="text-blue-700">{challengeProgram[challengeDay - 1].workout}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Apple className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">Alimentação</span>
                      </div>
                      <p className="text-green-700">{challengeProgram[challengeDay - 1].diet}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Dica do Dia</span>
                      </div>
                      <p className="text-yellow-700">{challengeProgram[challengeDay - 1].tip}</p>
                    </div>
                  </div>

                  {!completedDays.has(challengeDay) && (
                    <div className="text-center">
                      <button
                        onClick={() => completeChallengeDay(challengeDay)}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Marcar Dia como Concluído ✓
                      </button>
                    </div>
                  )}

                  {completedDays.has(challengeDay) && (
                    <div className="text-center p-4 bg-green-100 border border-green-300 rounded-lg">
                      <span className="text-green-800 font-semibold">✅ Dia {challengeDay} Concluído!</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Calendário de Dias */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Calendário do Plano</h3>
              <div className="grid grid-cols-7 gap-2">
                {challengeProgram.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setChallengeDay(day.day)}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      completedDays.has(day.day)
                        ? 'bg-green-500 text-white'
                        : day.day === challengeDay
                        ? 'bg-purple-600 text-white'
                        : day.day < challengeDay
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-bold">{day.day}</div>
                    <div className="text-xs mt-1">
                      {completedDays.has(day.day) ? '✓' : day.day === challengeDay ? '●' : '○'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Estatísticas */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Suas Estatísticas</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{completedDays.size}</div>
                  <div className="text-purple-700 text-sm">Dias Concluídos</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{Math.round((completedDays.size / 21) * 100)}%</div>
                  <div className="text-blue-700 text-sm">Progresso</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{21 - completedDays.size}</div>
                  <div className="text-green-700 text-sm">Dias Restantes</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{Math.max(0, challengeDay - 1)}</div>
                  <div className="text-orange-700 text-sm">Sequência Atual</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Dumbbell className="w-8 h-8 text-purple-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">FitTransform</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id, item.premium || false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    activeSection === item.id
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.premium && !isPremium && (
                    <Crown className="w-3 h-3 text-orange-500" />
                  )}
                </button>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  {isPremium && (
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Premium
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    title="Sair"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  Entrar
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleSectionClick(item.id, item.premium || false)
                    setMobileMenuOpen(false)
                  }}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.premium && !isPremium && (
                    <Crown className="w-3 h-3 text-orange-500" />
                  )}
                </button>
              ))}
              
              {!user && (
                <button
                  onClick={() => {
                    setAuthModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors mt-4"
                >
                  Entrar
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'calculator' && renderCalculator()}
        {activeSection === 'workouts' && renderWorkouts()}
        {activeSection === 'diet' && renderDiet()}
        {activeSection === 'challenge' && renderChallenge()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Dumbbell className="w-8 h-8 text-purple-400 mr-3" />
              <span className="text-2xl font-bold">FitTransform</span>
            </div>
            <p className="text-gray-400 mb-4">
              Transformando vidas através do fitness e alimentação saudável
            </p>
            <div className="text-sm text-gray-500 mb-2">
              © 2024 FitTransform. Todos os direitos reservados.
            </div>
            <div className="text-sm text-gray-400">
              Criado por <span className="text-purple-400 font-semibold">Lasy AI</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          // Recarregar dados do usuário
          getCurrentUser().then(setUser)
        }}
      />
    </div>
  )
}