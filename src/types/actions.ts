type ActionErrorState = {
    error: true
    message?: string
}

type ActionSuccessState = {
    success: true
}

export type ActionState = ActionErrorState | ActionSuccessState | null

export const isActionErrorState = (state: ActionState): state is ActionErrorState =>
    (state as ActionErrorState)?.error === true