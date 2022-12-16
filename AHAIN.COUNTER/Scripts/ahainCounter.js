var ahainSound = {};
var funcoes = {};
var nomeUsuario = "";
var fotoUsuario = "";
$(function () {
    var audioElement = $("#somEmitido");

    document.addEventListener('touchstart', function () {
        document.getElementsByTagName('audio')[0].play();
        document.getElementsByTagName('audio')[0].pause();
    });

    var chat = $.connection.chatHub;
    chat.client.iniciarAnimais = function (animais) {
        $("#ListaAnimais").empty();
        $.each(animais, function (index, value) {
            if (value.Nome == nomeUsuario)
                funcoes.adicionarUsuarioListaVoce($("#ListaAnimais"), animais[index]);
            else
                funcoes.adicionarUsuarioLista($("#ListaAnimais"), animais[index]);
        });
        if (nomeUsuario) {
            $("#btnAbrirModal").addClass('hidden');
            $(".botoesSom").removeClass('hidden');
            $("#btnAcabarComAGraca").removeClass('hidden');
            $("#painelDosAnimais").removeClass('hidden');
            $("#blocoTotalAhain").removeClass('hidden');
        }
    };

    chat.client.falou = function (animais, animal, som) {
        funcoes.DesabilitarBotoes();
        ControleSom.Emitir(audioElement, som);
        $("#ListaAnimais").empty();
        var totalSomEmitido = 0;
        $.each(animais, function (index, value) {
            if (animal == value.Nome)
                funcoes.adicionarUsuarioListaFezAhain($("#ListaAnimais"), value);
            else if (value.Nome == nomeUsuario)
                funcoes.adicionarUsuarioListaVoce($("#ListaAnimais"), value);
            else
                funcoes.adicionarUsuarioLista($("#ListaAnimais"), value);
            totalSomEmitido += value.TotalSomEmitido;
        });
        $("#totalAhain").html(totalSomEmitido);
    };

    chat.client.zerou = function () {
        funcoes.zerarTudo();
    };

    chat.client.terminouSom = function () {
        funcoes.HabilitarBotoes();
    }

    // Start the connection.
    $.connection.hub.start().done(function () {

        $('#btnFalouAhain').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "Ahain");
        });

        $('#btnFalouPru').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "Pru");
        });

        $('#btnFalouFom').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "Fom");
        });

        $('#btnFalouBenino').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "Benino");
        });

        $('#btnFalouGeleia').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "Geleia");
        });

        $('#btnFalouGroovador').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "Groovador");
        });

        $('#btnFalouBaba').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "Baba");
        });

        $('#btnFalouSeLoko').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "SeLoko");
        });

        $('#btnFalouRomarinho').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "Romarinho");
        });

        $('#btnFalouQQEhIsso').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "QQEhIsso");
        });

        $('#btnFalouSegredoNenhum').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "SegredoNenhum");
        });

        $('#btnFalouEh').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "Eh");
        });

        $('#btnFalouTemLaudo').click(function () {
            funcoes.DesabilitarBotoes();
            chat.server.falou(nomeUsuario, "TemLaudo");
        });

        $("#btnIniciarAnimalNome").click(function () {
            if ($("#nomeAnimal").val()) {
                if (!nomeUsuario) {
                    localStorage.setItem('nome', $("#nomeAnimal").val());
                    nomeUsuario = $("#nomeAnimal").val();
                    $('#modalNomeAnimal').modal('toggle');
                } else {
                    nomeUsuario = localStorage.getItem('nome');
                }
            } else {
                nomeUsuario = localStorage.getItem('nome');
            }

            chat.server.send(nomeUsuario);
            $("#boxNomeUsuario").removeClass('hidden');
            $("#nomeUsuario").html(nomeUsuario);
        });

        $('#btnAcabarComAGraca').click(function () {
            chat.server.zerar();
        });

        $(audioElement).on('ended', function () {
            chat.server.terminouSom();
        });

        if (!localStorage.getItem('nome'))
            $("#btnAbrirModal").click();
        else {
            nomeUsuario = localStorage.getItem('nome');
            $("#btnIniciarAnimalNome").click();
        }
    });

    var myAudioContext, myBuffers = {}, mySource, myNodes = {}, isPlaying = false;
    ControleSom = {
        Emitir: function (audioElement, som) {
            var src = document.createElement('source');
            src.type = "audio/ogg";
            if (som == "Ahain")
                src.src = 'audio/ahain_sound.mp3';
            if (som == "Pru")
                src.src = 'audio/pru_sound.mp3';
            if (som == "Fom")
                src.src = 'audio/fom_sound.mp3';
            if (som == "Benino")
                src.src = 'audio/benino_sound.mp3';
            if (som == "Geleia")
                src.src = 'audio/geleia_sound.mp3';
            if (som == "Groovador")
                src.src = 'audio/groovador_sound.mp3';
            if (som == "Baba")
                src.src = 'audio/baba_sound.mp3';
            if (som == "SeLoko")
                src.src = 'audio/seLoko_sound.mp3';
            if (som == "Romarinho")
                src.src = 'audio/romarinho_sound.mp3';
            if (som == "QQEhIsso")
                src.src = 'audio/qqehIsso_sound.mp3';
            if (som == "SegredoNenhum")
                src.src = 'audio/segredoNenhum_sound.mp3';
            if (som == "TemLaudo")
                src.src = 'audio/temLaudo_sound.mp3';
            if (som == "Eh")
                src.src = 'audio/eh_sound.mp3';

            $(audioElement).attr('src', src.src);
            $(audioElement).attr('preload', null);
            $(audioElement).trigger('play');
        },
        SomMobile: function (som, src) {
            myAudioContext = new webkitAudioContext();
            var request = new XMLHttpRequest();
            request = new XMLHttpRequest();
            request._soundName = som;
            request.open('GET', src, true);
            request.responseType = 'arraybuffer';
            request.addEventListener('load', ControleSom.SomMobileResponse, false);
            request.send();
        },
        SomMobileResponse: function (target) {
            var request = event.target;
            var buffer = myAudioContext.createBuffer(request.response, false);
            myBuffers[request._soundName] = buffer;
            ControleSom.SomMobilePlay();
        },
        SomMobilePlay: function () {
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            var audioContext = new AudioContext();

            var source = myAudioContext.createBufferSource();
            source.buffer = selectRandomBuffer();
            source.loop = true;
            source.noteOn(0);
            mySource = source;
        }
    }

    funcoes = {
        DesabilitarBotoes: function () {
            $('.botoesSom').addClass('disabled');
            $('.botoesSom').prop('disabled', true);
        },
        HabilitarBotoes: function () {
            $('.botoesSom').removeClass('disabled');
            $('.botoesSom').prop('disabled', false);
        },
        zerarTudo: function () {
            $("#ListaAnimais").empty();
            localStorage.removeItem('nome');
            nomeUsuario = '';
            $("#btnAbrirModal").removeClass('hidden');
            $(".botoesSom").addClass('hidden');
            $("#btnAcabarComAGraca").addClass('hidden');
            $("#painelDosAnimais").addClass('hidden');
            $("#boxNomeUsuario").addClass('hidden');
            $("#boxNomeUsuario").addClass('hidden');
            $("#blocoTotalAhain").addClass('hidden');
        },
        adicionarUsuarioLista: function (element, animal) {
            $(element).append("<li class='list-group-item'>" + animal.Nome + '<span class="badge contadorUsuario">' + animal.TotalSomEmitido + '</span></li>');
        },
        adicionarUsuarioListaVoce: function (element, animal) {
            $(element).append("<li class='list-group-item list-group-item-success'>" + animal.Nome + '<span class="badge contadorUsuario">' + animal.TotalSomEmitido + '</span></li>');
        },
        adicionarUsuarioListaFezAhain: function (element, animal) {
            $(element).append("<li class='list-group-item piscar'>" + animal.Nome + ' <span class="badge contadorUsuario">' + animal.TotalSomEmitido + '</span></li>');
            funcoes.exibirUsuarioAcao(animal.Nome == nomeUsuario);
        },
        exibirUsuarioAcao: function (usuarioMesmoAcao) {
            $(".piscar").toggleClass("executouAcao", 1000, 'swing', function () {
                if (usuarioMesmoAcao) {
                    $(".piscar").removeClass("executouAcao").removeClass("piscar").toggleClass("list-group-item-success", 1000);
                }
                else
                    $(".piscar").removeClass("executouAcao").removeClass("piscar");
            });
        }
    };
});