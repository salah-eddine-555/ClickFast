export const ConfigView = () => {

    return `
        <section class="view config-view">

            <h1>Configuration</h1>

            <form id="config-form">

                <div class="form-group">
                    <label for="pseudo">Pseudo</label>

                    <input
                        type="text"
                        id="pseudo"
                        name="pseudo"
                        placeholder="Votre pseudo"
                    >
                </div>

                <h2>Mode</h2>

                <button type="button" data-mode="classique">
                    Classique
                </button>

                <button type="button" data-mode="precision">
                    Précision
                </button>

                <h2>Difficulté</h2>

                <button type="button" data-difficulty="easy">
                    Easy
                </button>

                <button type="button" data-difficulty="medium">
                    Medium
                </button>

                <button type="button" data-difficulty="hard">
                    Hard
                </button>

                <h2>Durée</h2>

                <button type="button" data-duration="10">
                    10 secondes
                </button>

                <button type="button" data-duration="20">
                    20 secondes
                </button>

                <button type="button" data-duration="30">
                    30 secondes
                </button>

                <br><br>

                <button type="submit">
                    Start Game
                </button>

            </form>

        </section>
    `;
};