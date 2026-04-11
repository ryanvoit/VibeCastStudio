module.exports = {
	mode: 'production',
	// В поле entry размещается путь до js-файла, который будет точкой входа
	// для приложения (от англ. entry, переводится как "вход")
	entry: './src/main.ts',
	// В поле output размещаются настройки того, что будет в результате в
	// сборке (от англ. output, что можно перевести как "выход")
	output: {
		// Название файла. В простейшей конфигурации весь
		// код, как приложения, так и пакетов, попадёт именно сюда
		filename: 'main.js',
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},

	devServer: {
		static: {
			directory: './dist/index.html'
		}
	}
		
}