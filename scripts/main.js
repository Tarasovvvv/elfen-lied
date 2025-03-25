$(document).ready(function () {
  for (let i = 1; i < 5; i++) {
    $(`.categories li:nth-child(${i}) .circleButton`).click(function () {
      $("body").removeClass("noScroll");
      $(".categoryModal").removeClass("open");
      if ($(window).width() < 901) {
        $("body").addClass("noScroll");
        $(".categoryModal").removeClass("closed");
        $(".categoryModal").addClass("open");
      } else {
        const amount = $(`.categoryCard:nth-child(${i}) .number`).text().split(" ")[0];
        $(".category").addClass("expanded");
        $(".productsList").removeClass("expanded");
        $(".quanity").text(amount + " позиций в категории");
        $(".productsList").addClass("disabled");
        $(".productsList").removeClass("open");
        $(`.productsList:nth-child(${i + 1})`).addClass("open");
        $(`.productsList:nth-child(${i + 1})`).removeClass("disabled");

        if ($(".productsList.open").width() < $(".category.expanded").width()) {
          $(".moreButton").removeClass("expanded");
        } else {
          $(".moreButton").addClass("expanded");
        }
      }
    });
  }

  $(".moreButton").click(function () {
    $(".productsList").addClass("expanded");
    $(this).removeClass("expanded");
  });

  $(".bannerItem").click(function () {
    $(".bannerItem").removeClass("expanded");
    $(".bannerItem").addClass("collapsed");
    $(this).removeClass("collapsed");
    $(this).addClass("expanded");
  });

  const modalsNames = [".contacts", ".search", ".favourites", ".auth", ".cart", ".register"];

  const closeModals = () => {
    modalsNames.forEach((name) => {
      const modal = $(`${name}Modal`);
      if (modal.hasClass("open")) {
        modal.addClass("closed");
        modal.removeClass("open");
      }
    });
  };

  const toggleModal = (name) => {
    const modal = $(`${name}Modal`);
    const isOpen = modal.hasClass("open");
    closeModals();
    if (isOpen) {
      modal.addClass("closed");
      modal.removeClass("open");
    } else {
      $(`${name}Modal input`).val("");
      modal.addClass("open");
      modal.removeClass("closed");
    }
  };

  for (let i = 4; i < 9; i++) {
    $(`header li:nth-child(${i})`).click(() => {
      $(this).blur();
      toggleModal(modalsNames[i - 4]);
    });
  }

  $(".register").click(() => {
    $(this).blur();
    toggleModal(".register");
  });

  $(".auth").click(() => {
    $(this).blur();
    toggleModal(".auth");
  });

  $(".closeButton").click(() => {
    closeModals();
  });

  $(".categoryModal .closeButton").click(() => {
    $(".categoryModal").removeClass("open");
    $(".categoryModal").addClass("closed");
  });

  $(".search").click(() => {
    $(".searchModal > input[type='text']").focus();
  });

  $(".product .imgWrapper").click(() => {
    $("body").addClass("noScroll");
    $(".productModal").addClass("open");
  });

  $(".productModal .closeButton").click(() => {
    $("body").removeClass("noScroll");
    $(".productModal").removeClass("open");
    $(".productModal").addClass("closed");
  });

  $(".categoryModal .closeButton").click(() => {
    $("body").removeClass("noScroll");
    $(".categoryModal").removeClass("open");
    $(".productModal").addClass("closed");
  });

  $(".categoryModal img").click(() => {
    $(".productModal").addClass("open");
    $(".productModal").removeClass("closed");
  });

  $(".contacts").click(() => {
    $("body").addClass("noScroll");
  });

  $(".contacts .closeButton").click(() => {
    $("body").removeClass("noScroll");
  });

  $(".favouriteButton").click(function () {
    $(this).toggleClass("pressed");
  });

  ymaps.ready(init);

  function init() {
    const myMap = new ymaps.Map("map", {
      center: [55.7568, 37.6434],
      zoom: 16,
    });

    const myPlacemark = new ymaps.Placemark(
      [55.7568, 37.6434],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "/images/map-pin.png",
        iconImageSize: [70, 96],
        iconImageOffset: [-35, -96],
      }
    );

    myMap.geoObjects.add(myPlacemark);
  }
});
