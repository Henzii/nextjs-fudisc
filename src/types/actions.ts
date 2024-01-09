type ActionErrorState = {
    error: true
    message?: string
}

type ActionSuccessState<T> = {
    success: true
} & T

export type ActionState<T = {}> = ActionErrorState | ActionSuccessState<T> | null

export const isActionErrorState = (state: ActionState): state is ActionErrorState =>
    (state as ActionErrorState)?.error === true

export const isActionSuccessState = <T>(state: ActionState): state is ActionSuccessState<T> =>
    state !== null && !('error' in state)