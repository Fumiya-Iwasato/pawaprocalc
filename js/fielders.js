// グローバル変数
var ballisticAssess = 0;
var meetAssess = 0;
var powerAssess = 0;
var runAssess = 0;
var armAssess = 0;
var defenseAssess = 0;
var catchAssess = 0;
var spAbilityAssess = 0;
var fieldersSkills = new Map();
var url = "https://script.google.com/macros/s/AKfycbygqHyzxxGmjE7QHfAny3kat6Tv4Hh_A-ysCkN4nQEcBQOa_IYl/exec";

$(function () {
  //サニタイジング
  function escape_html(string) {
    if (typeof string !== 'string') {
      return string;
    }
    return string.replace(/[&'`"<>]/g, function (match) {
      return {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;'
      }[match];
    });
  }

  //合計値の計算
  var calcAssess = function calcAssess() {
    var basisTotal = ballisticAssess + meetAssess + powerAssess + runAssess + armAssess + defenseAssess + catchAssess + spAbilityAssess;
    var bonus = Math.floor(((ballisticAssess + meetAssess + powerAssess + runAssess + armAssess + defenseAssess + catchAssess) / 7.84 + 300) / 600) * 784;
    var beforeTotal = Math.floor((basisTotal + bonus + 1127) / 1400);
    var totalVal = beforeTotal * 14;
    $('#totalAssess').text(totalVal);

    //ランクの表示
    var rank = [
      '<div class="total-rank">F</div>', 
      '<div class="rank-e">E</div>', 
      '<div class="rank-d">D</div>', 
      '<div class="rank-c">C</div>', 
      '<div class="rank-b">B</div>', 
      '<div class="rank-a">A</div>', 
      '<div class="rank-s">S</div>', 
      '<div class="rank-s">S<span class="small">1</span></div>', 
      '<div class="rank-s">S<span class="small">2</span></div>', 
      '<div class="rank-s">S<span class="small">3</span></div>', 
      '<div class="rank-s">S<span class="small">4</span></div>', 
      '<div class="rank-s">S<span class="small">5</span></div>', 
      '<div class="rank-s">S<span class="small">6</span></div>', 
      '<div class="rank-s">S<span class="small">7</span></div>', 
      '<div class="rank-s">S<span class="small">8</span></div>', 
      '<div class="rank-s">S<span class="small">9</span></div>', 
      '<div class="rank-s">S<span class="ss">S</span></div>', 
      '<div class="rank-s">S<span class="ss">S</span><span class="small">1</span></div>', 
      '<div class="rank-s">S<span class="ss">S</span><span class="small">2</span></div>', 
      '<div class="rank-s">S<span class="ss">S</span><span class="small">3</span></div>', 
      '<div class="rank-s">S<span class="ss">S</span><span class="small">4</span></div>', 
      '<div class="rank-s">S<span class="ss">S</span><span class="small">5</span></div>', 
      '<div class="rank-s">S<span class="ss">S</span><span class="small">6</span></div>', 
      '<div class="rank-s">S<span class="ss">S</span><span class="small">7</span></div>', 
      '<div class="rank-s">S<span class="ss">S</span><span class="small">8</span></div>', 
      '<div class="rank-s">S<span class="ss">S</span><span class="small">9</span></div>', 
      '<div class="rank-pg">P<span class="small-g">G</span></div>', 
      '<div class="rank-pg">P<span class="small-g">G</span><span class="small-number">1</span></div>', 
      '<div class="rank-pg">P<span class="small-g">G</span><span class="small-number">2</span></div>', 
      '<div class="rank-pg">P<span class="small-g">G</span><span class="small-number">3</span></div>', 
      '<div class="rank-pg">P<span class="small-g">G</span><span class="small-number">4</span></div>', 
      '<div class="rank-pg">P<span class="small-g">G</span><span class="small-number">5</span></div>', 
      '<div class="rank-pg">P<span class="small-g">G</span><span class="small-number">6</span></div>', 
      '<div class="rank-pg">P<span class="small-g">G</span><span class="small-number">7</span></div>', 
      '<div class="rank-pg">P<span class="small-g">G</span><span class="small-number">8</span></div>', 
      '<div class="rank-pg">P<span class="small-g">G</span><span class="small-number">9</span></div>'
    ];
    $('#rank').html(rank[Math.floor((totalVal + 42) / 140)]);

    //次の査定まで
    var num = Math.floor((totalVal + 42) / 14);
    num = num.toString();
    var lastNum = num.slice(-1);
    $('.aim-yellow').html('▶︎'.repeat(Number(lastNum)));
    $('.aim-gray').html('▶︎'.repeat(9 - Number(lastNum)));
  }; 

  // 特能データ取得
  var getDefaultAbility = function getDefaultAbility() {
    $('.loader_wrap').removeClass('hide');
    $.getJSON(url, function (data) {
      for (var _i = 0; _i < data.length; _i++) {
        // console.log(data[i].name);
        fieldersSkills.set(data[_i].id, data[_i]);
      }
      //特能・初期表示
      window.fieldersSkills = fieldersSkills;
      $('#spability-area').html('');

      for (i = 1; i < 193; i++) {
        data = fieldersSkills.get(i);

        if (data.disp == 1) {
          var dom = '<button data-id="' + data.id + '" class="btn btn-primary disabled" data-higher-id="' + data.higher + '" data-lower-id="' + data.lower + '" data-assess-point="' + data.assesspoint + '">' + escape_html(data.name) + '</button>';
          $('#spability-area').append(dom);
        } else if (data.disp == 2) {
          var dom = '<button data-id="' + data.id + '" class="btn btn-primary disabled gold-ability" data-higher-id="' + data.higher + '" data-lower-id="' + data.lower + '" data-assess-point="' + data.assesspoint + '">' + escape_html(data.name) + '</button>';
          $('#spability-area').append(dom);
        } else if (data.disp == 3) {
          var dom = '<button data-id="' + data.id + '" class="btn btn-primary disabled green-ability" data-higher-id="' + data.higher + '" data-lower-id="' + data.lower + '" data-assess-point="' + data.assesspoint + '">' + escape_html(data.name) + '</button>';
          $('#spability-area').append(dom);
        } else if (data.disp == 4) {
          var dom = '<button data-id="' + data.id + '" class="btn btn-primary disabled blue-red-ability" data-higher-id="' + data.higher + '" data-lower-id="' + data.lower + '" data-assess-point="' + data.assesspoint + '">' + escape_html(data.name) + '</button>';
          $('#spability-area').append(dom);
        }
      }
      $('.loader_wrap').addClass('hide');

      //特能・クリック
      $('#spability-area .btn').on('click', function () {
        // 初回
        if ($(this).hasClass('disabled')) {
          $(this).removeClass('disabled');
          data = new Map();
        } else {
          // 最上級
          if ($(this).data('id') >= $(this).data('higher-id')) {
            $(this).addClass('disabled');
            var thisId = $(this).data('id');
            while (true) {
              var thisSkills = fieldersSkills.get(thisId);
              spAbilityAssess -= thisSkills.assesspoint;
              if (thisSkills.lower != '') {
                thisId = thisSkills.lower;
              } else {
                break;
              }
            }
          }
          data = fieldersSkills.get(Number($(this).data('higher-id')));
          $(this).text(escape_html(data.name));
          $(this).data('id', data.id);
          $(this).data('higher-id', data.higher);
          $(this).data('assess-point', data.assesspoint);
        }
        if (!$(this).hasClass('disabled')) {
          spAbilityAssess += Number($(this).data('assess-point'));
        }
        calcAssess();

        //色の変更
        if (data.type == 'gold') {
          $(this).addClass('gold-ability');
        } else if (data.type == 'rainbow') {
          $(this).addClass('rainbow-ability');
        } else if ($(this).hasClass('disabled')) {
          $(this).removeClass('gold-ability');
          $(this).removeClass('rainbow-ability');
        }
      }); 

      //ボタンの文字
      $('#spability-area .btn-primary').each(function () {
        var text = $(this).html();
        if (text.length < 9) {
          $(this).css('letter-spacing', 'normal');
        } else if (text.length < 10) {
          $(this).css('letter-spacing', '-0.1em');
        } else {
          $(this).css('letter-spacing', '-0.2em');
        }
      });
    });
  };
  getDefaultAbility(); 

  //リセット
  $('#reset').click(function () {
    $('#rank').html('<div class="total-rank">F</div>');
    $('#totalAssess').text(0);
    $('#assessAim').html('<span class="aim-yellow">▶︎▶︎▶︎</span><span class="aim-gray">▶︎▶︎▶︎▶︎▶︎▶︎</span>');
    $('#ballisticLevel').html('<div class="ballisticImage ballisticImage-2">➡︎</div>');
    $('.basisLevel').html('<div class="rank-e">E</div>');
    $('#ballisticValue').val('2');
    $('.basisValue').val('40');
    $('#spability-area .btn').addClass('disabled');
    getDefaultAbility();
    ballisticAssess = 0;
    meetAssess = 0;
    powerAssess = 0;
    runAssess = 0;
    armAssess = 0;
    defenseAssess = 0;
    catchAssess = 0;
    spAbilityAssess = 0;
  }); 

  //弾道・査定
  var calcBallistic = function calcBallistic(val) {
    switch (val) {
      case 2:
        ballisticAssess = 0;
        break;
      case 3:
        ballisticAssess = 2352;
        break;
      case 4:
        ballisticAssess = 4704;
        break;
    }
    var ability = [
      '', 
      '', 
      '<div id="ballisticLevel" class="ballisticImage ballisticImage-2">➡︎</div>', 
      '<div id="ballisticLevel" class="ballisticImage-3">➡︎</div>', 
      '<div id="ballisticLevel" class="ballisticImage-4">➡︎</div>'
    ];
    $('#ballisticLevel').html(ability[val]);
    calcAssess();
  }; 

  //ミート・査定
  var calcMeet = function calcMeet(val) {
    switch (val) {
      case 40:
        meetAssess = 0;
        break;
      case 42:
        meetAssess = 784;
        break;
      case 46:
        meetAssess = 1568;
        break;
      case 50:
        meetAssess = 2352;
        break;
      case 54:
        meetAssess = 3136;
        break;
      case 58:
        meetAssess = 3920;
        break;
      case 60:
        meetAssess = 7056;
        break;
      case 62:
        meetAssess = 7840;
        break;
      case 66:
        meetAssess = 8624;
        break;
      case 70:
        meetAssess = 10976;
        break;
      case 74:
        meetAssess = 11760;
        break;
      case 78:
        meetAssess = 12544;
        break;
      case 80:
        meetAssess = 17248;
        break;
      case 82:
        meetAssess = 18032;
        break;
      case 86:
        meetAssess = 18816;
        break;
      case 90:
        meetAssess = 21952;
        break;
      case 94:
        meetAssess = 22736;
        break;
      case 98:
        meetAssess = 23520;
        break;
      case 101:
        meetAssess = 32928;
        break;
      case 102:
        meetAssess = 33712;
        break;
      case 106:
        meetAssess = 39200;
        break;
      case 110:
        meetAssess = 39984;
        break;
      case 111:
        meetAssess = 44688;
        break;
      case 114:
        meetAssess = 45472;
        break;
    }
    //画像表示
    if (val < 111) {
      var ability = [
        '', 
        '', 
        '', 
        '', 
        '<div class="rank-e">E</div>', 
        '<div class="rank-d">D</div>', 
        '<div class="rank-c">C</div>', 
        '<div class="rank-b">B</div>', 
        '<div class="rank-a">A</div>', 
        '<div class="rank-s basis-s">S</div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
      ];
      $('#meetLevel').html(ability[Math.floor(val / 10)]);
    } else {
      $('#meetLevel').html('<div class="rank-s basis-s">S</span><span class="small small-2">2</span></div>');
    }
    calcAssess();
  }; 

  //パワー・査定
  var calcPower = function calcPower(val) {
    switch (val) {
      case 40:
        powerAssess = 0;
        break;
      case 41:
        powerAssess = 784;
        break;
      case 44:
        powerAssess = 1568;
        break;
      case 47:
        powerAssess = 2352;
        break;
      case 50:
        powerAssess = 3136;
        break;
      case 53:
        powerAssess = 3920;
        break;
      case 56:
        powerAssess = 4704;
        break;
      case 59:
        powerAssess = 5488;
        break;
      case 60:
        powerAssess = 9408;
        break;
      case 62:
        powerAssess = 10192;
        break;
      case 65:
        powerAssess = 10976;
        break;
      case 68:
        powerAssess = 11760;
        break;
      case 70:
        powerAssess = 13328;
        break;
      case 71:
        powerAssess = 14112;
        break;
      case 74:
        powerAssess = 14896;
        break;
      case 77:
        powerAssess = 15680;
        break;
      case 80:
        powerAssess = 18886;
        break;
      case 83:
        powerAssess = 19600;
        break;
      case 86:
        powerAssess = 20384;
        break;
      case 89:
        powerAssess = 21168;
        break;
      case 90:
        powerAssess = 25088;
        break;
      case 92:
        powerAssess = 25872;
        break;
      case 95:
        powerAssess = 26656;
        break;
      case 98:
        powerAssess = 27440;
        break;
      case 101:
        powerAssess = 37632;
        break;
    } 
    //画像表示
    if (val < 111) {
      var ability = [
        '', 
        '', 
        '', 
        '', 
        '<div class="rank-e">E</div>', 
        '<div class="rank-d">D</div>', 
        '<div class="rank-c">C</div>', 
        '<div class="rank-b">B</div>', 
        '<div class="rank-a">A</div>', 
        '<div class="rank-s basis-s">S</div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
      ];
      $('#powerLevel').html(ability[Math.floor(val / 10)]);
    } else {
      $('#powerLevel').html('<div class="rank-s basis-s">S</span><span class="small small-2">2</span></div>');
    }
    calcAssess();
  }; 

  //走力・査定
  var calcRun = function calcRun(val) {
    switch (val) {
      case 40:
        runAssess = 0;
        break;
      case 45:
        runAssess = 784;
        break;
      case 55:
        runAssess = 1568;
        break;
      case 60:
        runAssess = 3136;
        break;
      case 65:
        runAssess = 3920;
        break;
      case 70:
        runAssess = 5488;
        break;
      case 75:
        runAssess = 6272;
        break;
      case 80:
        runAssess = 7840;
        break;
      case 85:
        runAssess = 8624;
        break;
      case 90:
        runAssess = 10976;
        break;
      case 95:
        runAssess = 11760;
        break;
      case 101:
        runAssess = 22736;
        break;
      case 105:
        runAssess = 23520;
        break;
      case 106:
        runAssess = 27440;
        break;
      // case 111:
      //   runAssess = 420;
      //   break;
    } 
    //画像表示
    if (val < 111) {
      var ability = [
        '', 
        '', 
        '', 
        '', 
        '<div class="rank-e">E</div>', 
        '<div class="rank-d">D</div>', 
        '<div class="rank-c">C</div>', 
        '<div class="rank-b">B</div>', 
        '<div class="rank-a">A</div>', 
        '<div class="rank-s basis-s">S</div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
      ];
      $('#runLevel').html(ability[Math.floor(val / 10)]);
    } else {
      $('#runLevel').html('<div class="rank-s basis-s">S</span><span class="small small-2">2</span></div>');
    }
    calcAssess();
  }; 

  //肩力・査定
  var calcArm = function calcArm(val) {
    switch (val) {
      case 40:
        armAssess = 0;
        break;
      case 45:
        armAssess = 784;
        break;
      case 55:
        armAssess = 1568;
        break;
      case 60:
        armAssess = 3136;
        break;
      case 65:
        armAssess = 3920;
        break;
      case 70:
        armAssess = 5488;
        break;
      case 75:
        armAssess = 6272;
        break;
      case 80:
        armAssess = 7840;
        break;
      case 85:
        armAssess = 8624;
        break;
      case 90:
        armAssess = 10976;
        break;
      case 95:
        armAssess = 11760;
        break;
      case 101:
        armAssess = 22736;
        break;
      case 105:
        armAssess = 23520;
        break;
      case 106:
        armAssess = 27440;
        break;
      // case 111:
      //   runAssess = 420;
      //   break;
    } 
    //画像表示
    if (val < 111) {
      var ability = [
        '', 
        '', 
        '', 
        '', 
        '<div class="rank-e">E</div>', 
        '<div class="rank-d">D</div>', 
        '<div class="rank-c">C</div>', 
        '<div class="rank-b">B</div>', 
        '<div class="rank-a">A</div>', 
        '<div class="rank-s basis-s">S</div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
      ];
      $('#armLevel').html(ability[Math.floor(val / 10)]);
    } else {
      $('#armLevel').html('<div class="rank-s basis-s">S</span><span class="small small-2">2</span></div>');
    }
    calcAssess();
  }; 

  //守備力・査定
  var calcDefense = function calcDefense(val) {
    switch (val) {
      case 40:
        defenseAssess = 0;
        break;
      case 45:
        defenseAssess = 784;
        break;
      case 55:
        defenseAssess = 1568;
        break;
      case 60:
        defenseAssess = 3136;
        break;
      case 65:
        defenseAssess = 3920;
        break;
      case 70:
        defenseAssess = 6272;
        break;
      case 75:
        defenseAssess = 7056;
        break;
      case 80:
        defenseAssess = 8624;
        break;
      case 85:
        defenseAssess = 9408;
        break;
      case 90:
        defenseAssess = 10976;
        break;
      case 95:
        defenseAssess = 11760;
        break;
      case 101:
        defenseAssess = 22736;
        break;
      case 105:
        defenseAssess = 2352;
        break;
      case 106:
        defenseAssess = 27440;
        break;
      case 111:
        defenseAssess = 35280;
        break;
    } 
    //画像表示
    if (val < 111) {
      var ability = [
        '', 
        '', 
        '', 
        '', 
        '<div class="rank-e">E</div>', 
        '<div class="rank-d">D</div>', 
        '<div class="rank-c">C</div>', 
        '<div class="rank-b">B</div>', 
        '<div class="rank-a">A</div>', 
        '<div class="rank-s basis-s">S</div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
      ];
      $('#defenseLevel').html(ability[Math.floor(val / 10)]);
    } else {
      $('#defenseLevel').html('<div class="rank-s basis-s">S</span><span class="small small-2">2</span></div>');
    }
    calcAssess();
  }; 

  //捕球・査定
  var calcCatch = function calcCatch(val) {
    switch (val) {
      case 40:
        catchAssess = 0;
        break;
      case 45:
        catchAssess = 1784;
        break;
      case 55:
        catchAssess = 1568;
        break;
      case 65:
        catchAssess = 2352;
        break;
      case 75:
        catchAssess = 3136;
        break;
      case 85:
        catchAssess = 3920;
        break;
      case 95:
        catchAssess = 4704;
        break;
      case 101:
        catchAssess = 17248;
        break;
      case 105:
        catchAssess = 18032;
        break;
      case 106:
        catchAssess = 21168;
        break;
      // case 111:
      //   catchAssess = 322;
      //   break;
    } 
    //画像表示
    if (val < 111) {
      var ability = [
        '', 
        '', 
        '', 
        '', 
        '<div class="rank-e">E</div>', 
        '<div class="rank-d">D</div>', 
        '<div class="rank-c">C</div>', 
        '<div class="rank-b">B</div>', 
        '<div class="rank-a">A</div>', 
        '<div class="rank-s basis-s">S</div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
        '<div class="rank-s basis-s">S</span><span class="small small-2">1</span></div>', 
      ];
      $('#catchLevel').html(ability[Math.floor(val / 10)]);
    } else {
      $('#catchLevel').html('<div class="rank-s basis-s">S</span><span class="small small-2">2</span></div>');
    }
    calcAssess();
  }; 

  // 弾道変更時のイベント
  $('#ballisticValue').change(function () {
    calcBallistic(Number($(this).val()));
  });
  // ミート変更時のイベント
  $('#meetValue').change(function () {
    calcMeet(Number($(this).val()));
  }); 
  // パワー変更時のイベント
  $('#powerValue').change(function () {
    calcPower(Number($(this).val()));
  }); 
  // 走力変更時のイベント
  $('#runValue').change(function () {
    calcRun(Number($(this).val()));
  }); 
  // 肩力変更時のイベント
  $('#armValue').change(function () {
    calcArm(Number($(this).val()));
  }); 
  // 守備力変更時のイベント
  $('#defenseValue').change(function () {
    calcDefense(Number($(this).val()));
  }); 
  // 捕球変更時のイベント
  $('#catchValue').change(function () {
    calcCatch(Number($(this).val()));
  });
});