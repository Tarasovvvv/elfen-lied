$(document).ready(function () {
  const observer = new MutationObserver(() => {
    if ($(window).width() < 886 && !scrollableModalsNames.some((name) => $(`${name}Modal`).hasClass("open"))) {
      $("body").addClass("noScroll");
    }
    if ($(".modalRoot > *.open").length === 0) {
      $("body").removeClass("noScroll");
    }
  });

  observer.observe($(".modalRoot").get(0), { subtree: true, attributes: true, attributeFilter: ["class"] });

  $(window).on("resize", function () {
    if ($(".modalBackground").hasClass("open")) {
      if ($(window).width() < 901) {
        $("body").addClass("noScroll");
      } else {
        $("body").removeClass("noScroll");
        $(".modalBackground").removeClass("open");
      }
    } else {
      if ($(window).width() < 886 && $(".modalRoot > *.open").length > 0 && !scrollableModalsNames.some((name) => $(`${name}Modal`).hasClass("open"))) {
        $(".modalBackground").addClass("open");
      }
      $("body").removeClass("noScroll");
    }
  });

  for (let i = 1; i < 5; i++) {
    $(`.categories li:nth-child(${i}) .circleButton`).click(function () {
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
  const scrollableModalsNames = [".search"];

  const closeModals = () => {
    modalsNames.forEach((name) => {
      const modal = $(`${name}Modal`);
      if (modal.hasClass("open")) {
        modal.addClass("closed");
        modal.removeClass("open");
      }
    });
    $(".modalBackground").removeClass("open");
  };

  const toggleModal = (name) => {
    const modal = $(`${name}Modal`);
    const isOpen = modal.hasClass("open");

    closeModals();
    if (isOpen) {
      modal.addClass("closed");
      modal.removeClass("open");
      $(".modalBackground").removeClass("open");
    } else {
      $(`${name}Modal input`).val("");
      modal.addClass("open");
      modal.removeClass("closed");

      if (!scrollableModalsNames.includes(name) && $(window).width() < 901 && !window.location.href.includes("order.html")) {
        $(".modalBackground").addClass("open");
      }
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

  $(".search").click(() => {
    $(".searchModal > input[type='text']").focus();
  });

  $(".product .imgWrapper").click(() => {
    $("body").addClass("noScroll");
    $(".productModal").removeClass("closed");
    $(".productModal").addClass("open");
  });

  $(".productModal .closeButton").click(() => {
    if (!$(".categoryModal").hasClass("open")) {
      $("body").removeClass("noScroll");
    }
    $(".productModal").removeClass("open");
    $(".productModal").addClass("closed");
  });

  $(".categoryModal .closeButton").click(() => {
    $("body").removeClass("noScroll");
    $(".categoryModal").removeClass("open");
    $(".categoryModal").addClass("closed");
    $(".productModal").addClass("closed");
  });

  $(".categoryModal img").click(() => {
    $("body").addClass("noScroll");
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

  function setupDetailsBehavior() {
    const details = $(".cart");
    if (details.length === 0) return;

    if ($(window).width() >= 901) {
      details.attr("open", true);

      details.find("summary").on("click", function (e) {
        e.preventDefault();
      });
    } else {
      details.find("summary").off("click");
    }
  }

  $(window).on("load resize", setupDetailsBehavior);

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
        iconImageHref: "../images/map-pin.png",
        iconImageSize: [70, 96],
        iconImageOffset: [-35, -96],
      }
    );

    myMap.geoObjects.add(myPlacemark);
  }
});
