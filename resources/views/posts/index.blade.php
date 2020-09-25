@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">
        <div class="col-md-7  mt-4">
            @if(isset($category))
            <div class="alert alert-primary" role="alert">
                {{$category->name}}: {{$category->description}}
            </div>
            @endif
        </div>
    </div>
</div>

<div id="posts-index-page" data-posts="{{json_encode($posts)}}"></div>

<div class="container">
    <div class="row">
        <div class="col-md-7  mt-4">
            {{$posts->links()}}
        </div>
    </div>
</div>
@stop