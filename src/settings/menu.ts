export const MENU: any = [
  {
    //title: 'Main',
    // groupTitle: true
  },

  {
    title: 'Dashboard',
    icon: {
      class: 'fa fa-home',
      bg: '#ea8080',
      color: 'rgba(0,0,0,.87)'
    },
    routing: '/progress/dashboard'
  },

  {
    title: 'Progress',
    icon: {
      class: 'fa fa-pie-chart',
      bg: '#BCAAA4',
      color: 'rgba(0,0,0,.87)'
    },
    sub: [
      {
        title: 'STC',
        routing: '/progress/stc'
      },
      {
        title: 'Zain',
        routing: '/progress/zain'
      }
      ,
      {
        title: 'Mobily',
        routing: '/progress/mobily'
      }
    ]
  },

  {
    title: 'Locations',
    icon: {
      class: 'fa fa-table',
      bg: '#FFE082',
      color: 'rgba(0,0,0,.87)'

    },
    routing: '/progress/locations'

  },

  {
    title: 'Locations Map',
    icon: {
      class: 'fa fa-map-marker',
      bg: '#9E9E9E',
      color: 'rgba(0,0,0,.87)'

    },
    routing: '/progress/map-aramco-locations'

  }

];

export const MENU2: any = [
  {
    // title: 'Main',
    //groupTitle: true
  },
  {
    title: 'Dashboard',
    icon: {
      class: 'fa fa-home',
      bg: '#ea8080',
      color: 'rgba(0,0,0,.87)'
    },
    routing: '/progress/dashboard',
  },

  {
    title: 'My Progress',
    icon: {
      class: 'fa fa-pie-chart',
      bg: '#BCAAA4',
      color: 'rgba(0,0,0,.87)'
    },
    routing: '/progress/shared'

  },

  {
    title: 'Edit Status',
    icon: {
      class: 'fa fa-table',
      bg: '#FFE082',
      color: 'rgba(0,0,0,.87)'

    },
    routing: '/progress/shared/status'
  },
  {
    title: 'Locations Map',
    icon: {
      class: 'fa fa-map-marker',
      bg: '#9E9E9E',
      color: 'rgba(0,0,0,.87)'

    },
    routing: '/progress/map-aramco-locations'

  }


];