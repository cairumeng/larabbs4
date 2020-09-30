@extends('layouts.app')
@section('content')
<div id="posts-show-page" data-post="{{json_encode($post)}}" data-auth-user="{{json_encode($authUser)}}"
    data-replies="{{json_encode($replies)}}" />
@stop