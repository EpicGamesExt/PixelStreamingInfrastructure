/**
 * The base interface for all input controllers.
 * Since controllers mostly just register events and handle them the external interface is limited
 * to register/unregister
 */
export interface IInputController {
    register(): void;
    unregister(): void;
}
