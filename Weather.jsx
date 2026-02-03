import {useState} from "react"
import { Card, CardContent } from "./components/card.jsx";
import Input from "./components/Input.jsx";
import Button from "./components/button.jsx";
import { Sun, CloudRain, Snowflake, Cloud } from "lucide-react";

const API_KEY='ce8901f2d64705badbbe9a43288e8b51'
const API=''


export default function Weather (){
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

const fetchWeather = async() =>{
    setLoading(true)
    setError('')
    try{
        const response=  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if(!response.ok) throw new Error('city not found')
        const data= await response.json()
        setWeather(data)
    }

    catch(error){
        setError(error.message)
        setWeather(null)
    }
    setLoading(false)

}

const getWeatherIcon = (main) => {
  switch (main) {
    case "Clear":
      return <Sun className="text-yellow-400 w-10 h-10" />;
    case "Rain":
      return <CloudRain className="text-blue-400 w-10 h-10" />;
    case "Snow":
      return <Snowflake className="text-blue-400 w-10 h-10" />;
    case "Clouds":
      return <Cloud className="text-gray-400 w-10 h-10" />;
    default:
      return <Cloud className="text-gray-400 w-10 h-10" />;
  }
}

    return(
    <div className= "min-h-screen bg-gradient-to-br w-[1000px] from-blue-100 to-blue-300 flex items-center justify-center p-4">
        <Card className={'w-full max-w-md p-6 shadow-2xl rounded-2xl'}>
        <CardContent>
            <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">Weather App</h1>
            <div className= "flex gap-2 mb-4">
                <Input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city name"
                className= "flex-1"
                />
                <Button onClick={fetchWeather} disabled={loading}>{loading ? 'Loading' :'Search'}</Button>
            </div>
            {error && <p> {error}</p>}
            {
                weather && (
                    <div className="text-center ">
                        {getWeatherIcon(weather.weather[0].main)}
                        <h2 className="text-2x1 font-semibold mb-2">{weather.name}, {weather.sys.country}</h2>
                        <p className="text-1g text-gray-700">{weather.weather[0].main}-{weather.weather[0].description}</p>
                        <p className="text-4x1 font-bold text-blue-8000">{Math.round(weather.main.temp)}C</p>

                    </div>
                )
            }
        </CardContent>
        </Card>
    </div>
)
}
