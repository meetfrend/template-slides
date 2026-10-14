import type { ComponentType } from 'react'
import { Closing } from './closing'
import { Points } from './points'
import { Title } from './title'

/** The deck, in order. Add a slide by creating a component in this folder and listing it here. */
export const slides: ComponentType[] = [Title, Points, Closing]
