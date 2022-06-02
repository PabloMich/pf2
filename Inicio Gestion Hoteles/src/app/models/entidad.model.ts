export class Entidad {
  constructor(
    public _id: String,
    public nombreEmpresa: String,
    public direccionEmpresa: String,
    public tipoEmpresa: String,
    public municipioEmpresa: String,
    public usuario:String,
    public password:String,
    public rol:String
  ){}
}
