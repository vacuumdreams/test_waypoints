import { v4 as uuid } from 'uuid'

export const getUser = (): string => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
        return savedUser
    }

    const newUser = uuid()
    localStorage.setItem('user', newUser)
    return newUser
}
