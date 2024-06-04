const app = new Vue({
    el: '#app',
    data: () => ({
        baseSeleccionada: "10",
        binario: "",
        octal: "",
        decimal: "",
        hexadecimal: "",
        numero: "",
        // Lo siguiente controla la notificación nada más
        mostrarNotificacion: false,
    }),
    methods: {
        onBaseONumeroCambiado() {
            this.convertirDeDecimalALasDemasBases(parseInt(this.numero, this.baseSeleccionada));
        },

        // Se convierte primero el número a decimal y de ahí a las demás bases
        convertirDeDecimalALasDemasBases(numero) {
            if (!numero) // Si no hay número detiene la función
                return;
            this.binario = numero.toString("2");
            this.octal = numero.toString("8");
            this.decimal = numero.toString("10");
            this.hexadecimal = numero.toString("16");
        },

        copiarAlPortapapeles(texto) {
            if (!texto) return; // Si no hay texto detiene la función
            // Si no puede acceder al portapapeles invoca a copiarAlPortapapelesSiLaPrimeraOpcionFalla
            if (!navigator.clipboard) {
                return this.copiarAlPortapapelesSiLaPrimeraOpcionFalla(texto);
            }
            navigator.clipboard.writeText(texto)
                .then(() => {
                    console.log("El texto ha sido copiado con éxito");
                    this.indicarCopiadoExitoso();
                })
                .catch(error => {
                    //Por si el usuario no dió permisos u ocurre algún error
                    console.log("Hubo un error: ", error);
                    this.copiarAlPortapapelesSiLaPrimeraOpcionFalla(texto);
                });
        },
        copiarAlPortapapelesSiLaPrimeraOpcionFalla(texto) {
            prompt("Presiona CTRL + C para copiar, y luego presiona ENTER", texto);
            this.indicarCopiadoExitoso();
        },
        indicarCopiadoExitoso() {
            this.mostrarNotificacion = true;
            setTimeout(() => {
                this.mostrarNotificacion = false;
            }, 1000);
        }
    },

    // Vigilar si cambia la base o el número
    watch: {
        baseSeleccionada() {
            this.onBaseONumeroCambiado();
        },
        numero() {
            this.onBaseONumeroCambiado();
        }
    }
});