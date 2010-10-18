﻿viewImage = {
    imageId: '',
    initialize: function () {
        viewImage.imageId = getParameterByName('imageId');
        viewImage.updateView(viewImage.imageId);
    },

    hookEvents: function () {
        $('#image-title').editable(function (value, settings) {
            $.ajax({
                type: 'POST',
                url: '/Image/_UpdateImageTitle?imageId=' + viewImage.imageId,
                data: {
                    Title: value
                },
                error: function (xhr, ajaxOptions) {
                    alert('nay');
                },
                success: function (data) {

                }
            });
            return value;
        });
        $('#image-tags').editable(function (value, settings) {
            $.ajax({
                type: 'POST',
                url: '/Image/_UpdateImageTags?imageId=' + viewImage.imageId,
                data: {
                    Tags: value
                },
                error: function (xhr, ajaxOptions) {
                    alert('nay');
                },
                success: function (data) {

                }
            });
            return value;
        });

    },

    updateView: function (imageId) {
        $.ajax({
            dataType: "json",
            url: '/Image/_GetImage?imageId=' + imageId,
            error: function (xhr, ajaxOptions) {
                alert(xhr.status + ':' + xhr.responseText);
            },
            success: function (data) {
                $('#image-placeholder').html('');

                var tmpl = $('#focused-image-template').html();
                $.template('template', tmpl);

                $.tmpl('template', data)
                    .appendTo('#image-placeholder');
                viewImage.hookEvents();

            }
        });
    }
};

$(document).ready(viewImage.initialize);