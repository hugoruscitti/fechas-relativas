ayuda:
	@echo ""
	@echo "comandos disponibles"
	@echo ""
	@echo "   ejecutar"
	@echo "   push"
	@echo ""



ejecutar:
	python -m http.server


push:
	git push origin master
	@echo ""
	@echo "Listo, la aplicación estará publicada acá en breve:"
	@echo ""
	@echo "   https://hugoruscitti.github.io/fechas-relativas"
	@echo ""
