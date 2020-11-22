import House from './components/House.vue'
import Bathroom from './components/Bathroom.vue'
import Bedroom from './components/Bedroom.vue'

export const routes = [
    {
        path: '/', component: House, children: [
            {
                path: '', component: Bedroom
            },
            {
                path: 'bathroom', component: Bathroom
            }
        ]
    }
]