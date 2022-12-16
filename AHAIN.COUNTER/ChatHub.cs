using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AHAIN.COUNTER
{
    public class ChatHub : Hub
    {
        public static List<AHAINFalador> Animais;

        public void Send(string name = "")
        {
            if (!string.IsNullOrEmpty(name))
                if (!Animais.Exists(x => x.Nome.Equals(name, StringComparison.InvariantCultureIgnoreCase)))
                    Animais.Add(new AHAINFalador() { Nome = name, Sons = new List<Som>() });
            Clients.All.iniciarAnimais(Animais);
        }

        public void Falou(string animal, string som)
        {
            if (Animais == null) Animais = new List<AHAINFalador>();
            if (Animais.Any())
            {
                var pessoa = (from p in Animais
                              where p.Nome.ToUpper() == animal.ToUpper()
                              select p).FirstOrDefault();
                if (pessoa != null)
                {
                    var somEncontrado = pessoa.Sons.FirstOrDefault(x => x.NomeSom.ToString() == som);
                    if (somEncontrado != null)
                        somEncontrado.Quantidade++;
                    else
                        pessoa.Sons.Add(new Som()
                        {
                            NomeSom = (TipoSom)Enum.Parse(typeof(TipoSom), som),
                            Quantidade = 1
                        });
                }
            }
            Clients.All.falou(Animais, animal, som);
        }

        public void TerminouSom()
        {
            Clients.All.terminouSom();
        }

        public void Zerar()
        {
            Animais.Clear();
            Clients.All.zerou();
        }
    }

    public class AHAINFalador
    {
        public string Nome { get; set; }        
        public List<Som> Sons { get; set; }
        public int TotalSomEmitido
        {
            get
            {
                return Sons.Sum(x => x.Quantidade);
            }
        }
        public AHAINFalador()
        {
            Sons = new List<Som>();

        }
    }

    public class Som
    {
        public TipoSom NomeSom { get; set; }
        public int Quantidade { get; set; }
    }

    public enum TipoSom
    {
        Ahain,
        Fom,
        Pru,
        Benino,
        Geleia,
        Groovador,
        Baba,
        SeLoko,
        Romarinho,
        QQEhIsso,
        SegredoNenhum,
        TemLaudo,
        Eh
    }
}