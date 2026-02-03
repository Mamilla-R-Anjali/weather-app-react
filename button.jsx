const Button = ({children, className='', disabled=false, ...props})=>{
return(
    <button className={`bg-blue-600 text-white px-4 py-2 rounded hover: bg-blue-700 disabled: cursor-not-allowed ${className}`}
    disabled= {disabled}{... props}>{children}</button>
)
}
export default Button