import { createRouter, createWebHistory } from 'vue-router'

import SigninView from '@/views/Authentication/SigninView.vue';
import SignupView from '@/views/Authentication/SignupView.vue';
import CalendarView from '@/views/CalendarView.vue';
import BasicChartView from '@/views/Charts/BasicChartView.vue';
import ECommerceView from '@/views/Dashboard/ECommerceView.vue';
import FormElementsView from '@/views/Forms/FormElementsView.vue';
import FormLayoutView from '@/views/Forms/FormLayoutView.vue';
import SettingsView from '@/views/Pages/SettingsView.vue';
import ProfileView from '@/views/ProfileView.vue';
import TablesView from '@/views/TablesView.vue';
import AlertsView from '@/views/UiElements/AlertsView.vue';
import ButtonsView from '@/views/UiElements/ButtonsView.vue';

import datosGov from '@/views/Diplomado/datosGov.vue';
import Inicio from '@/views/Diplomado/Inicio.vue';
import Charts from '@/views/Diplomado/Charts.vue';

// Rutas de las páginas de Socrata y datos.gov
const routes = [

  //RUTAS DEL TEMPLATE
  {
    path: '/',
    name: 'Inicio',
    component: Inicio,
    meta: {
      title: 'Página de inicio de aspirantes'
    }
  },
  {
    path: '/estudiantes-inscritos',
    name: 'estudiantes inscritos',
    component: datosGov,
    meta: {
      title: 'Aspirantes Inscritos Facultad/Programa/Genero/Estrato de 2015-1 a 2021-1'
    }
  },
  {
    path: '/estudiantes-charts',
    name: 'Charts',
    component: Charts,
    meta: {
      title: 'ESTADÍSTICAS Y FILTROS DE ASPIRANTES'
    }
  },
  // SECCIÓN DE DIRECCIONES DE TEMPLATE
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    meta: {
      title: 'Calendar'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/forms/form-elements',
    name: 'formElements',
    component: FormElementsView,
    meta: {
      title: 'Form Elements'
    }
  },
  {
    path: '/forms/form-layout',
    name: 'formLayout',
    component: FormLayoutView,
    meta: {
      title: 'Form Layout'
    }
  },
  {
    path: '/tables',
    name: 'tables',
    component: TablesView,
    meta: {
      title: 'Tables'
    }
  },
  {
    path: '/pages/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: 'Settings'
    }
  },
  {
    path: '/charts/basic-chart',
    name: 'basicChart',
    component: BasicChartView,
    meta: {
      title: 'Basic Chart'
    }
  },
  {
    path: '/ui-elements/alerts',
    name: 'alerts',
    component: AlertsView,
    meta: {
      title: 'Alerts'
    }
  },
  {
    path: '/ui-elements/buttons',
    name: 'buttons',
    component: ButtonsView,
    meta: {
      title: 'Buttons'
    }
  },
  {
    path: '/auth/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'Signin'
    }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  next()
})

export default router
